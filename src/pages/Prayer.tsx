import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Heart } from 'lucide-react';
import { toast } from 'sonner';
import MapboxMap from '@/components/prayer/MapboxMap';
import CountryCard from '@/components/prayer/CountryCard';
import TopCountriesList from '@/components/prayer/TopCountriesList';
import PrayerStats from '@/components/prayer/PrayerStats';
import MapLegend from '@/components/prayer/MapLegend';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

const Prayer = () => {
  const [prayerCounts, setPrayerCounts] = useState<PrayerCount[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<PrayerCount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerCounts();
  }, []);

  const fetchPrayerCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('prayer_counts')
        .select('*')
        .order('prayer_count', { ascending: false });

      if (error) throw error;
      setPrayerCounts(data || []);
    } catch (error) {
      console.error('Error fetching prayer counts:', error);
      toast.error('Failed to load prayer data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrayForCountry = async (country: PrayerCount) => {
    try {
      // Use secure RPC to increment on the server
      const { data, error } = await (supabase.rpc as any)('increment_prayer_count', { _id: country.id });

      if (error) throw error;

      const updated = (data as unknown as PrayerCount) || { ...country, prayer_count: (country.prayer_count || 0) + 1 };

      // Update local state with server value
      setPrayerCounts(prev => 
        prev.map(c => 
          c.id === country.id 
            ? { ...c, prayer_count: updated.prayer_count }
            : c
        )
      );

      // Update selected country if it's the same one
      if (selectedCountry?.id === country.id) {
        setSelectedCountry(prev => 
          prev ? { ...prev, prayer_count: updated.prayer_count } : null
        );
      }

      toast.success(`Thank you for praying for ${country.country_name}! 🙏`);
    } catch (error) {
      console.error('Error updating prayer count:', error);
      toast.error('Please sign in to record your prayer');
    }
  };

  const getCountryColor = (count: number) => {
    if (count === 0) return 'fill-slate-200 stroke-slate-300';
    if (count < 5) return 'fill-yellow-200 stroke-yellow-400';
    if (count < 15) return 'fill-orange-200 stroke-orange-400';
    if (count < 30) return 'fill-red-200 stroke-red-400';
    if (count < 60) return 'fill-red-400 stroke-red-500';
    if (count < 100) return 'fill-red-600 stroke-red-700';
    return 'fill-red-800 stroke-red-900';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-8 h-8 animate-pulse text-primary mx-auto mb-4" />
          <p>Loading prayer map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Europe Prayer Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join believers across Europe in prayer. Select a country to pray for and see how many others are lifting up that nation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Interactive Prayer Map
                </CardTitle>
                <CardDescription>
                  Click on a country to select it and see prayer statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapboxMap 
                  prayerCounts={prayerCounts}
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                  getCountryColor={getCountryColor}
                />
                <MapLegend />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Country Card */}
            {selectedCountry && (
              <CountryCard 
                selectedCountry={selectedCountry}
                onPrayForCountry={handlePrayForCountry}
              />
            )}

            {/* Top Prayed Countries */}
            <TopCountriesList 
              prayerCounts={prayerCounts}
              onCountrySelect={setSelectedCountry}
            />

            {/* Stats Card */}
            <PrayerStats prayerCounts={prayerCounts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;