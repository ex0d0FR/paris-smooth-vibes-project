import React from 'react';

interface PrayerCount {
  id: string;
  country_code: string;
  country_name: string;
  prayer_count: number;
}

interface EuropeMapProps {
  prayerCounts: PrayerCount[];
  selectedCountry: PrayerCount | null;
  onCountrySelect: (country: PrayerCount | null) => void;
  getCountryColor: (count: number) => string;
}

const EuropeMap: React.FC<EuropeMapProps> = ({ 
  prayerCounts, 
  selectedCountry, 
  onCountrySelect, 
  getCountryColor 
}) => {
  return (
    <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 rounded-lg min-h-[400px] flex items-center justify-center">
      <svg viewBox="0 0 1000 800" className="w-full h-full max-w-4xl">
        {/* France */}
        <path 
          d="M280 380L320 360L340 390L330 420L310 440L270 430L250 400Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FR' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FR') || null)}
        />
        {/* Germany */}
        <path 
          d="M380 320L420 310L440 340L430 370L410 380L370 370L350 340Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DE' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DE') || null)}
        />
        {/* United Kingdom */}
        <path 
          d="M200 280L240 270L250 300L230 320L190 310L180 290Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GB')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GB' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GB') || null)}
        />
        {/* Italy */}
        <path 
          d="M400 450L430 440L450 470L460 500L440 530L420 520L400 490Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IT' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IT') || null)}
        />
        {/* Spain */}
        <path 
          d="M200 450L280 440L300 470L290 500L200 510L180 480Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'ES')?.prayer_count || 0)} ${selectedCountry?.country_code === 'ES' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'ES') || null)}
        />
        {/* Poland */}
        <path 
          d="M480 320L520 310L540 340L530 370L510 380L470 370L450 340Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PL' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PL') || null)}
        />
        {/* Netherlands */}
        <path 
          d="M340 290L370 280L380 310L360 320L330 310Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NL' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NL') || null)}
        />
        {/* Sweden */}
        <path 
          d="M480 180L510 170L520 220L510 260L480 250L460 200Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SE' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SE') || null)}
        />
        {/* Norway */}
        <path 
          d="M420 140L460 130L480 180L460 200L430 190L410 160Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NO' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NO') || null)}
        />
        {/* Romania */}
        <path 
          d="M560 380L600 370L620 400L610 430L590 440L550 430L530 400Z" 
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RO' ? 'stroke-primary stroke-2' : 'stroke-slate-400'}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RO') || null)}
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
            onClick={() => onCountrySelect(country)}
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
  );
};

export default EuropeMap;