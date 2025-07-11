import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

interface MapboxMapProps {
  prayerCounts: PrayerCount[];
  selectedCountry: PrayerCount | null;
  onCountrySelect: (country: PrayerCount | null) => void;
  getCountryColor: (count: number) => string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  prayerCounts, 
  selectedCountry, 
  onCountrySelect, 
  getCountryColor 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [10, 54], // Center on Europe
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 8,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add countries data source
      map.current.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1'
      });

      // Add country fills layer
      map.current.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        filter: ['in', 'iso_3166_1_alpha_2', ...prayerCounts.map(c => c.country_code)],
        paint: {
          'fill-color': [
            'case',
            ...prayerCounts.flatMap(country => [
              ['==', ['get', 'iso_3166_1_alpha_2'], country.country_code],
              getMapboxColor(country.prayer_count)
            ]),
            '#e2e8f0' // default color
          ],
          'fill-opacity': 0.7
        }
      });

      // Add country borders layer
      map.current.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        'source-layer': 'country_boundaries',
        filter: ['in', 'iso_3166_1_alpha_2', ...prayerCounts.map(c => c.country_code)],
        paint: {
          'line-color': '#ffffff',
          'line-width': 1
        }
      });

      // Add selected country highlight
      map.current.addLayer({
        id: 'country-selected',
        type: 'line',
        source: 'countries',
        'source-layer': 'country_boundaries',
        filter: ['==', 'iso_3166_1_alpha_2', selectedCountry?.country_code || ''],
        paint: {
          'line-color': 'hsl(var(--primary))',
          'line-width': 3
        }
      });

      // Add click handler
      map.current.on('click', 'country-fills', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const countryCode = feature.properties?.iso_3166_1_alpha_2;
          const country = prayerCounts.find(c => c.country_code === countryCode);
          if (country) {
            onCountrySelect(country);
          }
        }
      });

      // Add hover cursor
      map.current.on('mouseenter', 'country-fills', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });

      map.current.on('mouseleave', 'country-fills', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
      });

      // Add popup on hover
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.current.on('mouseenter', 'country-fills', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const countryCode = feature.properties?.iso_3166_1_alpha_2;
          const country = prayerCounts.find(c => c.country_code === countryCode);
          
          if (country && map.current) {
            popup.setLngLat(e.lngLat)
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold">${country.country_name}</h3>
                  <p class="text-sm text-muted-foreground">${country.prayer_count} prayers</p>
                </div>
              `)
              .addTo(map.current);
          }
        }
      });

      map.current.on('mouseleave', 'country-fills', () => {
        popup.remove();
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, prayerCounts, onCountrySelect]);

  // Update selected country highlight
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      map.current.setFilter('country-selected', [
        '==', 'iso_3166_1_alpha_2', selectedCountry?.country_code || ''
      ]);
    }
  }, [selectedCountry]);

  const getMapboxColor = (count: number) => {
    if (count === 0) return '#e2e8f0';
    if (count < 10) return '#dbeafe';
    if (count < 50) return '#93c5fd';
    if (count < 100) return '#3b82f6';
    return '#1e40af';
  };

  if (!mapboxToken) {
    return (
      <div className="p-8 text-center bg-muted/50 rounded-lg border-2 border-dashed border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-muted-foreground mb-4">
            Please enter your Mapbox public token to display the interactive map.
          </p>
          <input
            type="text"
            placeholder="Enter your Mapbox public token..."
            className="w-full max-w-md px-3 py-2 border border-border rounded-md"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Get your free token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapboxMap;