import React, { TouchEvent } from 'react';
import { RoverState, GridSize, Obstacle } from '../types';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

interface GridProps {
  rover: RoverState;
  gridSize: GridSize;
  obstacles: Obstacle[];
  swipeHandlers?: SwipeHandlers;
}

const Grid: React.FC<GridProps> = ({ rover, gridSize, obstacles, swipeHandlers }) => {
  const getObstacleAt = (x: number, y: number) => 
    obstacles.find(o => o.x === x && o.y === y);

  const isPath = (x: number, y: number) => {
    const pathWithoutCurrent = rover.path.slice(0, -1);
    return pathWithoutCurrent.some(p => p.x === x && p.y === y);
  };

  const renderCells = () => {
    const cells = [];
    
    for (let y = gridSize.height - 1; y >= 0; y--) {
      for (let x = 0; x < gridSize.width; x++) {
        const isRoverHere = rover.position.x === x && rover.position.y === y;
        const obstacle = getObstacleAt(x, y);
        const isPathCell = isPath(x, y);

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`
              relative w-full pb-[100%] border border-space-800 rounded-sm
              transition-all duration-300
              ${isPathCell ? 'bg-mars-900/20' : 'bg-space-800/50'}
              ${obstacle ? 'bg-mars-900/80 border-mars-800' : ''}
              ${isRoverHere && rover.isCrashed ? 'animate-pulse bg-red-900' : ''}
            `}
          >
            {obstacle && (
              <div className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl">
                🪨
              </div>
            )}

            {isRoverHere && (
              <div 
                className={`
                  absolute inset-0 flex items-center justify-center text-2xl md:text-3xl
                  transition-transform duration-300 ease-out z-10
                `}
                style={{
                    transform: 
                        rover.direction === 'N' ? 'rotate(90deg)' :
                        rover.direction === 'E' ? 'scaleX(-1)' :
                        rover.direction === 'S' ? 'rotate(-90deg)' :
                        'rotate(0deg)'
                }}
              >
                {rover.isCrashed ? '💥' : '🏎️'}
              </div>
            )}
            
            {isPathCell && !isRoverHere && !obstacle && (
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <div className="w-1.5 h-1.5 rounded-full bg-mars-500"></div>
               </div>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div 
      className="p-4 bg-space-900 rounded-xl border border-space-700 shadow-2xl overflow-hidden relative"
      {...(swipeHandlers || {})}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(102,252,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(102,252,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div 
        className="grid gap-1 relative z-10"
        style={{
          gridTemplateColumns: `repeat(${gridSize.width}, minmax(0, 1fr))`
        }}
      >
        {renderCells()}
      </div>
      
      <div className="mt-3 flex justify-between items-end text-xs font-mono text-space-500 border-t border-space-800 pt-2">
        <div>
          POS: <span className="text-space-300">{rover.position.x}, {rover.position.y}</span>
        </div>
        <div>
           DIR: <span className="text-mars-400 font-bold">{rover.direction}</span>
        </div>
      </div>
    </div>
  );
};

export default Grid;