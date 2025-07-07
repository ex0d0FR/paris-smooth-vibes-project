import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

const Prayer = () => {
  const { t } = useTranslation();
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
      const { error } = await supabase
        .from('prayer_counts')
        .update({ prayer_count: country.prayer_count + 1 })
        .eq('id', country.id);

      if (error) throw error;

      // Update local state
      setPrayerCounts(prev => 
        prev.map(c => 
          c.id === country.id 
            ? { ...c, prayer_count: c.prayer_count + 1 }
            : c
        )
      );

      toast.success(`Thank you for praying for ${country.country_name}! 🙏`);
    } catch (error) {
      console.error('Error updating prayer count:', error);
      toast.error('Failed to record your prayer');
    }
  };

  const getCountryColor = (count: number) => {
    if (count === 0) return 'fill-muted stroke-border';
    if (count < 10) return 'fill-blue-200 stroke-blue-400';
    if (count < 50) return 'fill-blue-400 stroke-blue-600';
    if (count < 100) return 'fill-blue-600 stroke-blue-800';
    return 'fill-blue-800 stroke-blue-900';
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
                {/* Simplified Europe Map - This would be replaced with an actual SVG map */}
                <div className="grid grid-cols-6 gap-2 p-4 bg-muted/30 rounded-lg min-h-[400px]">
                  {prayerCounts.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountry(country)}
                      className={`
                        p-2 rounded text-xs font-medium transition-all duration-200 hover:scale-105
                        ${getCountryColor(country.prayer_count)}
                        ${selectedCountry?.id === country.id ? 'ring-2 ring-primary' : ''}
                      `}
                      title={`${country.country_name}: ${country.prayer_count} prayers`}
                    >
                      {country.country_code}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <span>0 prayers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <span>1-9 prayers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                    <span>10-49 prayers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span>50-99 prayers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-800 rounded"></div>
                    <span>100+ prayers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Country Card */}
            {selectedCountry && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedCountry.country_name}
                    <Badge variant="secondary">
                      {selectedCountry.prayer_count} prayers
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Join {selectedCountry.prayer_count} others in praying for {selectedCountry.country_name}.
                  </p>
                  <Button 
                    onClick={() => handlePrayForCountry(selectedCountry)}
                    className="w-full"
                    size="lg"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Pray for {selectedCountry.country_name}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Top Prayed Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Most Prayed For</CardTitle>
                <CardDescription>
                  Countries with the most prayers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prayerCounts.slice(0, 10).map((country, index) => (
                    <div 
                      key={country.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedCountry(country)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{country.country_name}</span>
                      </div>
                      <Badge variant="outline">
                        {country.prayer_count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Prayer Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Prayers:</span>
                    <Badge variant="secondary">
                      {prayerCounts.reduce((sum, country) => sum + country.prayer_count, 0)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries:</span>
                    <Badge variant="secondary">
                      {prayerCounts.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries with prayers:</span>
                    <Badge variant="secondary">
                      {prayerCounts.filter(c => c.prayer_count > 0).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;