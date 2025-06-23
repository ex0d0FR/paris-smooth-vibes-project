
import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RestaurantSearchFiltersProps {
  searchTerm: string;
  cuisineFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onCuisineChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const RestaurantSearchFilters: React.FC<RestaurantSearchFiltersProps> = ({
  searchTerm,
  cuisineFilter,
  statusFilter,
  onSearchChange,
  onCuisineChange,
  onStatusChange
}) => {
  const { t } = useTranslation('restaurants');

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>
      
      <Select value={cuisineFilter} onValueChange={onCuisineChange}>
        <SelectTrigger className="w-full md:w-64 h-12">
          <SelectValue placeholder={t('search.allCuisines')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('search.allCuisines')}</SelectItem>
          <SelectItem value="french">{t('search.cuisines.french')}</SelectItem>
          <SelectItem value="italian">{t('search.cuisines.italian')}</SelectItem>
          <SelectItem value="japanese">{t('search.cuisines.japanese')}</SelectItem>
          <SelectItem value="lebanese">{t('search.cuisines.lebanese')}</SelectItem>
          <SelectItem value="indian">{t('search.cuisines.indian')}</SelectItem>
          <SelectItem value="asian">{t('search.cuisines.asian')}</SelectItem>
          <SelectItem value="healthy">{t('search.cuisines.healthy')}</SelectItem>
          <SelectItem value="bakery">{t('search.cuisines.bakery')}</SelectItem>
          <SelectItem value="fastfood">{t('search.cuisines.fastfood')}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-48 h-12">
          <SelectValue placeholder={t('search.allStatuses')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('search.allStatuses')}</SelectItem>
          <SelectItem value="open">{t('search.statuses.open')}</SelectItem>
          <SelectItem value="closed">{t('search.statuses.closed')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RestaurantSearchFilters;
