import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

interface PrayerStatsProps {
  prayerCounts: PrayerCount[];
}

const PrayerStats: React.FC<PrayerStatsProps> = ({ prayerCounts }) => {
  return (
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
  );
};

export default PrayerStats;