import React from 'react';

const MapLegend: React.FC = () => {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#e2e8f0' }}></div>
        <span>0 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fef3c7' }}></div>
        <span>1-4 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fed7aa' }}></div>
        <span>5-14 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fca5a5' }}></div>
        <span>15-29 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f87171' }}></div>
        <span>30-59 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
        <span>60-99 prayers</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#991b1b' }}></div>
        <span>100+ prayers</span>
      </div>
    </div>
  );
};

export default MapLegend;