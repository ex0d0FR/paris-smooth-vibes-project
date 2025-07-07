import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

interface TopCountriesListProps {
  prayerCounts: PrayerCount[];
  onCountrySelect: (country: PrayerCount) => void;
}

const TopCountriesList: React.FC<TopCountriesListProps> = ({ prayerCounts, onCountrySelect }) => {
  return (
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
              onClick={() => onCountrySelect(country)}
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
  );
};

export default TopCountriesList;