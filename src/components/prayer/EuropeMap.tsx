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
      <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ minHeight: '400px' }}>
        {/* Ocean/Sea background */}
        <rect width="1000" height="600" className="fill-blue-100 dark:fill-blue-900" />
        
        {/* Iceland */}
        <path 
          d="M50 80L90 75L110 95L105 115L70 120L45 105Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IS')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IS' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IS') || null)}
        />
        
        {/* Norway */}
        <path 
          d="M450 50L465 45L480 55L490 80L500 120L505 160L500 190L490 210L480 205L470 170L465 130L460 90L455 70Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NO' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NO') || null)}
        />
        
        {/* Sweden */}
        <path 
          d="M505 70L520 65L535 75L545 110L550 150L545 190L535 220L525 215L515 180L510 140L505 100Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SE') || null)}
        />
        
        {/* Finland */}
        <path 
          d="M550 80L580 75L600 85L610 120L615 160L610 190L600 210L580 215L560 210L555 170L550 130L545 100Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FI')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FI' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FI') || null)}
        />
        
        {/* United Kingdom */}
        <path 
          d="M200 160L220 155L240 165L250 190L245 215L225 225L200 220L185 200L190 175Z M160 180L175 175L185 195L175 210L155 205L150 190Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GB')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GB' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GB') || null)}
        />
        
        {/* Ireland */}
        <path 
          d="M130 190L150 185L160 205L155 220L135 215L125 200Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IE') || null)}
        />
        
        {/* Denmark */}
        <path 
          d="M460 220L480 215L490 235L485 245L465 240Z M470 205L480 200L485 210L475 215Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DK')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DK' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DK') || null)}
        />
        
        {/* Netherlands */}
        <path 
          d="M360 250L380 245L390 265L385 275L365 270L355 255Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'NL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'NL' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'NL') || null)}
        />
        
        {/* Belgium */}
        <path 
          d="M340 270L365 265L375 280L365 290L345 285Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BE') || null)}
        />
        
        {/* Germany */}
        <path 
          d="M390 255L460 250L500 270L510 310L500 350L460 360L420 355L400 330L390 300L385 270Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'DE')?.prayer_count || 0)} ${selectedCountry?.country_code === 'DE' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'DE') || null)}
        />
        
        {/* Poland */}
        <path 
          d="M510 270L560 265L600 280L610 320L600 360L560 365L520 355L515 310Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PL')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PL' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PL') || null)}
        />
        
        {/* France */}
        <path 
          d="M260 280L330 275L360 290L380 320L370 370L330 390L280 385L240 360L230 320L240 290Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'FR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'FR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'FR') || null)}
        />
        
        {/* Spain */}
        <path 
          d="M160 350L280 345L300 370L290 420L260 450L180 455L150 430L140 390L155 360Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'ES')?.prayer_count || 0)} ${selectedCountry?.country_code === 'ES' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'ES') || null)}
        />
        
        {/* Portugal */}
        <path 
          d="M130 390L170 385L180 430L170 460L140 455L125 420Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'PT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'PT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'PT') || null)}
        />
        
        {/* Italy */}
        <path 
          d="M400 370L430 365L450 390L460 430L450 470L430 490L410 485L400 450L395 410Z M440 490L460 485L470 505L455 515L445 510Z M360 410L375 405L380 420L365 425Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'IT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'IT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'IT') || null)}
        />
        
        {/* Switzerland */}
        <path 
          d="M370 350L400 345L410 365L395 375L365 370Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CH')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CH' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CH') || null)}
        />
        
        {/* Austria */}
        <path 
          d="M420 330L470 325L490 345L475 355L445 350Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'AT')?.prayer_count || 0)} ${selectedCountry?.country_code === 'AT' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'AT') || null)}
        />
        
        {/* Czech Republic */}
        <path 
          d="M460 310L500 305L515 325L495 335L465 330Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'CZ')?.prayer_count || 0)} ${selectedCountry?.country_code === 'CZ' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'CZ') || null)}
        />
        
        {/* Slovakia */}
        <path 
          d="M515 315L550 310L565 330L550 340L525 335Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SK')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SK' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SK') || null)}
        />
        
        {/* Hungary */}
        <path 
          d="M490 340L550 335L570 355L555 365L525 360Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'HU')?.prayer_count || 0)} ${selectedCountry?.country_code === 'HU' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'HU') || null)}
        />
        
        {/* Romania */}
        <path 
          d="M570 345L620 340L640 370L630 410L600 415L575 400L565 365Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RO')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RO' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RO') || null)}
        />
        
        {/* Ukraine */}
        <path 
          d="M620 310L730 305L760 340L750 380L700 390L660 375L640 340Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'UA')?.prayer_count || 0)} ${selectedCountry?.country_code === 'UA' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'UA') || null)}
        />
        
        {/* Bulgaria */}
        <path 
          d="M600 410L650 405L670 425L655 435L625 430Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BG')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BG' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BG') || null)}
        />
        
        {/* Serbia */}
        <path 
          d="M560 400L600 395L615 415L600 425L575 420Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'RS')?.prayer_count || 0)} ${selectedCountry?.country_code === 'RS' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'RS') || null)}
        />
        
        {/* Croatia */}
        <path 
          d="M500 390L560 385L570 405L555 415L515 410Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'HR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'HR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'HR') || null)}
        />
        
        {/* Bosnia and Herzegovina */}
        <path 
          d="M520 410L555 405L565 425L550 435L530 430Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'BA')?.prayer_count || 0)} ${selectedCountry?.country_code === 'BA' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'BA') || null)}
        />
        
        {/* Slovenia */}
        <path 
          d="M460 370L500 365L510 385L495 395L465 390Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'SI')?.prayer_count || 0)} ${selectedCountry?.country_code === 'SI' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'SI') || null)}
        />
        
        {/* Greece */}
        <path 
          d="M560 450L610 445L630 470L615 490L585 485L565 465Z M600 500L620 495L630 515L615 525L605 520Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'GR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'GR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'GR') || null)}
        />
        
        {/* Turkey (European part) */}
        <path 
          d="M660 450L710 445L730 465L715 475L675 470Z" 
          className={`cursor-pointer transition-all duration-200 hover:brightness-110 stroke-white dark:stroke-slate-300 stroke-1 ${getCountryColor(prayerCounts.find(c => c.country_code === 'TR')?.prayer_count || 0)} ${selectedCountry?.country_code === 'TR' ? 'stroke-primary stroke-2' : ''}`}
          onClick={() => onCountrySelect(prayerCounts.find(c => c.country_code === 'TR') || null)}
        />
        
        {/* Add remaining smaller countries as circles with labels */}
        {prayerCounts.filter(country => 
          !['IS', 'NO', 'SE', 'FI', 'GB', 'IE', 'DK', 'NL', 'BE', 'DE', 'PL', 'FR', 'ES', 'PT', 'IT', 'CH', 'AT', 'CZ', 'SK', 'HU', 'RO', 'UA', 'BG', 'RS', 'HR', 'BA', 'SI', 'GR', 'TR'].includes(country.country_code)
        ).map((country, index) => {
          const cols = 8;
          const x = 100 + (index % cols) * 95;
          const y = 540 + Math.floor(index / cols) * 30;
          return (
            <g key={country.id}>
              <circle
                cx={x}
                cy={y}
                r="14"
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