import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log('Fetching Mapbox token...');
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        console.log('Mapbox token response:', { data, error });
        
        if (error) throw error;
        
        if (data?.token) {
          console.log('Setting Mapbox token:', data.token.substring(0, 10) + '...');
          setMapboxToken(data.token);
        } else {
          console.error('No token in response:', data);
        }
      } catch (error) {
        console.error('Error fetching Mapbox token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapboxToken();
  }, []);

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

      console.log('Map loaded, prayer counts:', prayerCounts);
      console.log('Country codes:', prayerCounts.map(c => c.country_code));

      // Add countries data source
      map.current.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1'
      });

      console.log('Added countries source');

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

      console.log('Added country fills layer');

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
        console.log('Country clicked:', e.features);
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const countryCode = feature.properties?.iso_3166_1_alpha_2;
          console.log('Country code from click:', countryCode);
          const country = prayerCounts.find(c => c.country_code === countryCode);
          console.log('Found country data:', country);
          if (country) {
            onCountrySelect(country);
          }
        }
      });

      console.log('Added click handler');

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
    if (count === 0) return '#e2e8f0'; // Light gray for no prayers
    if (count < 5) return '#fef3c7'; // Light yellow for 1-4 prayers
    if (count < 15) return '#fed7aa'; // Light orange for 5-14 prayers
    if (count < 30) return '#fca5a5'; // Light red for 15-29 prayers
    if (count < 60) return '#f87171'; // Red for 30-59 prayers
    if (count < 100) return '#dc2626'; // Dark red for 60-99 prayers
    return '#991b1b'; // Very dark red for 100+ prayers
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] rounded-lg border border-border bg-muted/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className="p-8 text-center bg-muted/50 rounded-lg border-2 border-dashed border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Map Unavailable</h3>
          <p className="text-muted-foreground">
            Unable to load the interactive map. Please check your Mapbox configuration.
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