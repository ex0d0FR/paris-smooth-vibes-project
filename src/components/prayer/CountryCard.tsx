import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

interface CountryCardProps {
  selectedCountry: PrayerCount;
  onPrayForCountry: (country: PrayerCount) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ selectedCountry, onPrayForCountry }) => {
  return (
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
          onClick={() => onPrayForCountry(selectedCountry)}
          className="w-full"
          size="lg"
        >
          <Heart className="w-4 h-4 mr-2" />
          Pray for {selectedCountry.country_name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CountryCard;