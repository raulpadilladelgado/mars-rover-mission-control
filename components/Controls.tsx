import React from 'react';

interface ControlsProps {
  onReset: () => void;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onReset, disabled }) => {
  return (
    <div className="bg-space-800 p-6 rounded-xl border border-space-700 shadow-lg flex flex-col gap-6 sticky top-8">
      
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-space-600 font-mono tracking-wider border-b border-space-700 pb-2">
          CONTROLS
        </h3>
        <ul className="text-sm text-space-500 space-y-2 list-disc pl-4">
          <li>Use <strong>Arrow Keys</strong> to move.</li>
          <li>Avoid obstacles (🪨).</li>
          <li>The system will <strong>auto-reboot</strong> 5s after a crash.</li>
        </ul>
      </div>

      <button
        onClick={onReset}
        className="mt-auto w-full py-3 bg-red-900/20 hover:bg-red-900 hover:text-white text-red-500 border border-red-900/50 rounded font-mono text-sm uppercase tracking-wider transition-all"
      >
        System Reset
      </button>
    </div>
  );
};

export default Controls;