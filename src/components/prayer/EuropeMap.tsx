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
    <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-inner">
      <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ minHeight: '500px' }}>
        {/* Background Ocean */}
        <rect width="1000" height="600" className="fill-blue-100 dark:fill-blue-950" />
        
        {/* United Kingdom */}
        <path 
          d="M180 200L200 180L220 190L240 185L250 210L230 230L210 235L190 225Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GB')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GB' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GB') || null)}
        />
        
        {/* Ireland */}
        <path 
          d="M140 220L160 215L170 235L155 245L135 240Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IE' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IE') || null)}
        />
        
        {/* Norway */}
        <path 
          d="M480 80L500 70L520 90L530 130L520 160L500 180L480 170L470 140L465 110L470 90Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NO' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NO') || null)}
        />
        
        {/* Sweden */}
        <path 
          d="M530 120L550 110L560 140L570 180L560 220L540 250L520 240L510 200L515 160L525 130Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SE' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SE') || null)}
        />
        
        {/* Finland */}
        <path 
          d="M570 120L600 115L620 140L630 180L620 220L600 240L580 235L570 200L575 160Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FI')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FI' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FI') || null)}
        />
        
        {/* Denmark */}
        <path 
          d="M480 250L500 245L510 265L500 275L485 270Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DK')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DK' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DK') || null)}
        />
        
        {/* Netherlands */}
        <path 
          d="M380 280L400 275L410 295L395 305L375 300Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NL' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NL') || null)}
        />
        
        {/* Germany */}
        <path 
          d="M410 290L480 285L520 300L530 340L520 380L480 390L440 385L420 360L405 330L400 300Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DE' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DE') || null)}
        />
        
        {/* Poland */}
        <path 
          d="M530 300L580 295L620 310L630 350L620 390L580 395L540 385L535 340Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PL' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PL') || null)}
        />
        
        {/* France */}
        <path 
          d="M280 310L350 305L380 320L400 350L390 400L350 420L300 415L260 390L250 350L260 320Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FR' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FR') || null)}
        />
        
        {/* Spain */}
        <path 
          d="M200 380L300 375L320 400L310 450L280 480L200 485L170 460L160 420L175 390Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'ES')?.prayer_count || 0)} ${selectedCountry?.country_code === 'ES' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'ES') || null)}
        />
        
        {/* Portugal */}
        <path 
          d="M160 420L200 415L210 460L200 490L170 485L155 450Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PT' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PT') || null)}
        />
        
        {/* Italy */}
        <path 
          d="M420 400L450 395L470 420L480 460L470 500L450 520L430 515L420 480L415 440Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IT' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IT') || null)}
        />
        
        {/* Switzerland */}
        <path 
          d="M390 380L420 375L430 395L415 405L385 400Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CH')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CH' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CH') || null)}
        />
        
        {/* Austria */}
        <path 
          d="M440 360L480 355L500 375L485 385L455 380Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'AT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'AT' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'AT') || null)}
        />
        
        {/* Czech Republic */}
        <path 
          d="M480 340L520 335L535 355L515 365L485 360Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CZ')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CZ' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CZ') || null)}
        />
        
        {/* Hungary */}
        <path 
          d="M520 370L560 365L580 385L565 395L535 390Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'HU')?.prayer_count || 0)} ${selectedCountry?.country_code === 'HU' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'HU') || null)}
        />
        
        {/* Romania */}
        <path 
          d="M580 380L630 375L650 410L640 450L610 455L580 440L575 400Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RO' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RO') || null)}
        />
        
        {/* Ukraine */}
        <path 
          d="M630 340L720 335L750 370L740 410L700 420L660 405L640 375Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'UA')?.prayer_count || 0)} ${selectedCountry?.country_code === 'UA' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'UA') || null)}
        />
        
        {/* Bulgaria */}
        <path 
          d="M620 440L660 435L680 455L665 465L635 460Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BG')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BG' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BG') || null)}
        />
        
        {/* Greece */}
        <path 
          d="M580 480L620 475L640 500L625 520L595 515L575 495Z" 
          className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GR' ? 'stroke-primary stroke-3' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GR') || null)}
        />
        
        {/* Add remaining smaller countries as circles with labels */}
        {prayerCounts.filter(country => 
          !['GB', 'IE', 'NO', 'SE', 'FI', 'DK', 'NL', 'DE', 'PL', 'FR', 'ES', 'PT', 'IT', 'CH', 'AT', 'CZ', 'HU', 'RO', 'UA', 'BG', 'GR'].includes(country.country_code)
        ).map((country, index) => {
          const cols = 8;
          const x = 100 + (index % cols) * 100;
          const y = 540 + Math.floor(index / cols) * 35;
          return (
            <g key={country.id}>
              <circle
                cx={x}
                cy={y}
                r="18"
                className={`cursor-pointer transition-all duration-200 hover:opacity-80 stroke-slate-600 dark:stroke-slate-300 stroke-1 ${getCountryColor(country.prayer_count)} ${selectedCountry?.id === country.id ? 'stroke-primary stroke-3' : ''}`}
                onClick={() => onCountrySelect(country)}
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                className="text-xs font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none"
              >
                {country.country_code}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default EuropeMap;