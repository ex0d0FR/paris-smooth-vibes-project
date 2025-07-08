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
    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-600">
      <svg viewBox="0 0 1000 700" className="w-full h-full" style={{ minHeight: '500px' }}>
        {/* Ocean background */}
        <rect width="1000" height="700" className="fill-blue-200 dark:fill-blue-900" />
        
        {/* Iceland */}
        <path 
          d="M80 120L120 110L140 130L135 150L100 155L75 140Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IS')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IS' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IS') || null)}
        />
        
        {/* Norway */}
        <path 
          d="M460 80L480 70L500 85L510 120L520 160L515 200L500 230L485 220L475 180L470 140L465 100Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NO' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NO') || null)}
        />
        
        {/* Sweden */}
        <path 
          d="M520 100L540 90L560 110L570 150L575 200L570 250L555 280L540 275L530 240L525 200L520 160L515 120Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SE') || null)}
        />
        
        {/* Finland */}
        <path 
          d="M570 110L600 100L620 120L630 160L635 200L630 240L620 270L600 275L580 270L575 230L570 190L565 150Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FI')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FI' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FI') || null)}
        />
        
        {/* United Kingdom */}
        <path 
          d="M200 180L220 175L240 185L250 210L245 235L220 250L195 245L180 220L185 195Z M160 200L175 195L185 215L175 230L155 225L150 210Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GB')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GB' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GB') || null)}
        />
        
        {/* Ireland */}
        <path 
          d="M130 210L150 205L160 225L155 240L135 235L125 220Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IE') || null)}
        />
        
        {/* Denmark */}
        <path 
          d="M480 250L500 245L510 265L505 275L485 270Z M490 235L500 230L505 240L495 245Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DK')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DK' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DK') || null)}
        />
        
        {/* Netherlands */}
        <path 
          d="M380 280L400 275L410 295L405 305L385 300L375 285Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NL' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NL') || null)}
        />
        
        {/* Belgium */}
        <path 
          d="M360 300L385 295L395 310L385 320L365 315Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BE') || null)}
        />
        
        {/* Germany */}
        <path 
          d="M410 285L480 280L520 300L530 340L520 380L480 390L440 385L420 360L410 330L405 300Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DE') || null)}
        />
        
        {/* Poland */}
        <path 
          d="M530 300L580 295L620 310L630 350L620 390L580 395L540 385L535 340Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PL' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PL') || null)}
        />
        
        {/* France */}
        <path 
          d="M280 310L350 305L380 320L400 350L390 400L350 420L300 415L260 390L250 350L260 320Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FR') || null)}
        />
        
        {/* Spain */}
        <path 
          d="M180 380L300 375L320 400L310 450L280 480L200 485L170 460L160 420L175 390Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'ES')?.prayer_count || 0)} ${selectedCountry?.country_code === 'ES' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'ES') || null)}
        />
        
        {/* Portugal */}
        <path 
          d="M150 420L190 415L200 460L190 490L160 485L145 450Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PT') || null)}
        />
        
        {/* Italy */}
        <path 
          d="M420 400L450 395L470 420L480 460L470 500L450 520L430 515L420 480L415 440Z M460 520L480 515L490 535L475 545L465 540Z M380 440L395 435L400 450L385 455Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IT') || null)}
        />
        
        {/* Switzerland */}
        <path 
          d="M390 380L420 375L430 395L415 405L385 400Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CH')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CH' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CH') || null)}
        />
        
        {/* Austria */}
        <path 
          d="M440 360L490 355L510 375L495 385L465 380Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'AT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'AT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'AT') || null)}
        />
        
        {/* Czech Republic */}
        <path 
          d="M480 340L520 335L535 355L515 365L485 360Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CZ')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CZ' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CZ') || null)}
        />
        
        {/* Slovakia */}
        <path 
          d="M535 345L570 340L585 360L570 370L545 365Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SK')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SK' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SK') || null)}
        />
        
        {/* Hungary */}
        <path 
          d="M510 370L570 365L590 385L575 395L545 390Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'HU')?.prayer_count || 0)} ${selectedCountry?.country_code === 'HU' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'HU') || null)}
        />
        
        {/* Romania */}
        <path 
          d="M590 375L640 370L660 400L650 440L620 445L595 430L585 395Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RO' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RO') || null)}
        />
        
        {/* Ukraine */}
        <path 
          d="M640 340L750 335L780 370L770 410L720 420L680 405L660 375Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'UA')?.prayer_count || 0)} ${selectedCountry?.country_code === 'UA' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'UA') || null)}
        />
        
        {/* Bulgaria */}
        <path 
          d="M620 440L670 435L690 455L675 465L645 460Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BG')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BG' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BG') || null)}
        />
        
        {/* Serbia */}
        <path 
          d="M580 430L620 425L635 445L620 455L595 450Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RS')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RS' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RS') || null)}
        />
        
        {/* Croatia */}
        <path 
          d="M520 420L580 415L590 435L575 445L535 440Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'HR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'HR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'HR') || null)}
        />
        
        {/* Bosnia and Herzegovina */}
        <path 
          d="M540 440L575 435L585 455L570 465L550 460Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BA')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BA' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BA') || null)}
        />
        
        {/* Slovenia */}
        <path 
          d="M480 400L520 395L530 415L515 425L485 420Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SI')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SI' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SI') || null)}
        />
        
        {/* Greece */}
        <path 
          d="M580 480L630 475L650 500L635 520L605 515L585 495Z M620 530L640 525L650 545L635 555L625 550Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GR') || null)}
        />
        
        {/* Turkey (European part) */}
        <path 
          d="M680 480L730 475L750 495L735 505L695 500Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'TR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'TR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'TR') || null)}
        />
        
        {/* Add remaining smaller countries as circles with labels */}
        {prayerCounts.filter(country => 
          !['IS', 'NO', 'SE', 'FI', 'GB', 'IE', 'DK', 'NL', 'BE', 'DE', 'PL', 'FR', 'ES', 'PT', 'IT', 'CH', 'AT', 'CZ', 'SK', 'HU', 'RO', 'UA', 'BG', 'RS', 'HR', 'BA', 'SI', 'GR', 'TR'].includes(country.country_code)
        ).map((country, index) => {
          const cols = 8;
          const x = 100 + (index % cols) * 105;
          const y = 580 + Math.floor(index / cols) * 35;
          return (
            <g key={country.id}>
              <circle
                cx={x}
                cy={y}
                r="16"
                className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(country.prayer_count)} ${selectedCountry?.id === country.id ? 'stroke-primary stroke-2' : ''}`}
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