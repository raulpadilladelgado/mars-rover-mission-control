import React from 'react';
import { Direction } from '../types';

interface TouchControlsProps {
  onMove: (direction: Direction) => void;
  disabled: boolean;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onMove, disabled }) => {
  const handleButtonClick = (direction: Direction) => {
    if (!disabled) {
      onMove(direction);
    }
  };

  const buttonBaseClass = "flex items-center justify-center text-2xl font-bold transition-all active:scale-95 select-none touch-none";
  const buttonEnabledClass = "bg-space-600/20 hover:bg-space-600/40 active:bg-space-600/60 text-space-600 border-2 border-space-600";
  const buttonDisabledClass = "bg-space-800/50 text-space-800 border-2 border-space-800 cursor-not-allowed";

  return (
    <div className="bg-space-800 p-6 rounded-xl border border-space-700 shadow-lg">
      <h3 className="font-bold text-space-600 font-mono tracking-wider border-b border-space-700 pb-2 mb-4">
        TOUCH CONTROLS
      </h3>
      
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {/* Empty top-left */}
        <div></div>
        
        {/* North button */}
        <button
          onClick={() => handleButtonClick('N')}
          disabled={disabled}
          className={`${buttonBaseClass} ${disabled ? buttonDisabledClass : buttonEnabledClass} rounded-t-lg h-20`}
          aria-label="Move North"
        >
          <span className="text-3xl">↑</span>
        </button>
        
        {/* Empty top-right */}
        <div></div>
        
        {/* West button */}
        <button
          onClick={() => handleButtonClick('W')}
          disabled={disabled}
          className={`${buttonBaseClass} ${disabled ? buttonDisabledClass : buttonEnabledClass} rounded-l-lg h-20`}
          aria-label="Move West"
        >
          <span className="text-3xl">←</span>
        </button>
        
        {/* Center indicator */}
        <div className="flex items-center justify-center h-20 bg-space-900/50 rounded border border-space-700">
          <span className="text-4xl">🏎️</span>
        </div>
        
        {/* East button */}
        <button
          onClick={() => handleButtonClick('E')}
          disabled={disabled}
          className={`${buttonBaseClass} ${disabled ? buttonDisabledClass : buttonEnabledClass} rounded-r-lg h-20`}
          aria-label="Move East"
        >
          <span className="text-3xl">→</span>
        </button>
        
        {/* Empty bottom-left */}
        <div></div>
        
        {/* South button */}
        <button
          onClick={() => handleButtonClick('S')}
          disabled={disabled}
          className={`${buttonBaseClass} ${disabled ? buttonDisabledClass : buttonEnabledClass} rounded-b-lg h-20`}
          aria-label="Move South"
        >
          <span className="text-3xl">↓</span>
        </button>
        
        {/* Empty bottom-right */}
        <div></div>
      </div>
      
      <div className="mt-4 text-xs text-space-500 text-center font-mono">
        TAP DIRECTION TO MOVE
      </div>
    </div>
  );
};

export default TouchControls;
