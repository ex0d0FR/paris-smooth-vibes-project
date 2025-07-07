import React from 'react';

const MapLegend: React.FC = () => {
  return (
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
  );
};

export default MapLegend;