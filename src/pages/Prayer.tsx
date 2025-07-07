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
                {/* Interactive Europe SVG Map */}
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 rounded-lg min-h-[400px] flex items-center justify-center">
                  <svg viewBox="0 0 1000 800" className="w-full h-full max-w-4xl">
                    {/* France */}
                    <path 
                      d="M280 380L320 360L340 390L330 420L310 440L270 430L250 400Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FR' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'FR') || null)}
                    />
                    {/* Germany */}
                    <path 
                      d="M380 320L420 310L440 340L430 370L410 380L370 370L350 340Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DE' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'DE') || null)}
                    />
                    {/* United Kingdom */}
                    <path 
                      d="M200 280L240 270L250 300L230 320L190 310L180 290Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GB')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GB' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'GB') || null)}
                    />
                    {/* Italy */}
                    <path 
                      d="M400 450L430 440L450 470L460 500L440 530L420 520L400 490Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IT' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'IT') || null)}
                    />
                    {/* Spain */}
                    <path 
                      d="M200 450L280 440L300 470L290 500L200 510L180 480Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'ES')?.prayer_count || 0)} ${selectedCountry?.country_code === 'ES' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'ES') || null)}
                    />
                    {/* Poland */}
                    <path 
                      d="M480 320L520 310L540 340L530 370L510 380L470 370L450 340Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PL' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'PL') || null)}
                    />
                    {/* Netherlands */}
                    <path 
                      d="M340 290L370 280L380 310L360 320L330 310Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NL' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'NL') || null)}
                    />
                    {/* Sweden */}
                    <path 
                      d="M480 180L510 170L520 220L510 260L480 250L460 200Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SE' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'SE') || null)}
                    />
                    {/* Norway */}
                    <path 
                      d="M420 140L460 130L480 180L460 200L430 190L410 160Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NO' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'NO') || null)}
                    />
                    {/* Romania */}
                    <path 
                      d="M560 380L600 370L620 400L610 430L590 440L550 430L530 400Z" 
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RO' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                      onClick={() => setSelectedCountry(prayerCounts.find(c => c.country_code === 'RO') || null)}
                    />
                    {/* Add more countries as simplified shapes */}
                    {prayerCounts.filter(country => 
                      !['FR', 'DE', 'GB', 'IT', 'ES', 'PL', 'NL', 'SE', 'NO', 'RO'].includes(country.country_code)
                    ).map((country, index) => (
                      <circle
                        key={country.id}
                        cx={300 + (index % 8) * 60}
                        cy={600 + Math.floor(index / 8) * 40}
                        r="20"
                        className={`cursor-pointer transition-all duration-200 hover:scale-110 ${getCountryColor(country.prayer_count)} ${selectedCountry?.id === country.id ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
                        onClick={() => setSelectedCountry(country)}
                      />
                    ))}
                    {/* Country labels for circles */}
                    {prayerCounts.filter(country => 
                      !['FR', 'DE', 'GB', 'IT', 'ES', 'PL', 'NL', 'SE', 'NO', 'RO'].includes(country.country_code)
                    ).map((country, index) => (
                      <text
                        key={`label-${country.id}`}
                        x={300 + (index % 8) * 60}
                        y={607 + Math.floor(index / 8) * 40}
                        textAnchor="middle"
                        className="text-xs font-medium fill-current pointer-events-none"
                      >
                        {country.country_code}
                      </text>
                    ))}
                  </svg>
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