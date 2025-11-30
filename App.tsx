import React, { useState, useEffect, useCallback, useRef } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import TouchControls from './components/TouchControls';
import { executeCommand, generateObstacles, DIRECTIONS } from './domain/marsRover';
import { RoverState, GridSize, Obstacle, Direction } from './types';
import { useIsTouchDevice } from './hooks/useIsTouchDevice';
import { useSwipeGesture } from './hooks/useSwipeGesture';

const INITIAL_GRID: GridSize = { width: 10, height: 10 };
const INITIAL_ROVER: RoverState = {
  position: { x: 0, y: 0 },
  direction: 'N',
  isCrashed: false,
  path: [{ x: 0, y: 0 }],
};

const App: React.FC = () => {
  const [rover, setRover] = useState<RoverState>(INITIAL_ROVER);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDevice = useIsTouchDevice();
  
  // Demo mode: Allow toggling touch mode with 't' key for testing
  const [forceTouchMode, setForceTouchMode] = useState(false);
  const showTouchControls = isTouchDevice || forceTouchMode;

  useEffect(() => {
    setObstacles(generateObstacles(8, INITIAL_GRID));
  }, []);

  const handleReset = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setRover(INITIAL_ROVER);
    setObstacles(generateObstacles(Math.floor(Math.random() * 5) + 5, INITIAL_GRID));
    setIsExecuting(false);
  }, []);

  useEffect(() => {
    if (rover.isCrashed) {
      resetTimerRef.current = setTimeout(() => {
        handleReset();
      }, 5000);
    }
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [rover.isCrashed, handleReset]);

  const executeSequence = async (sequence: string, currentRover: RoverState) => {
    if (currentRover.isCrashed) return;

    setIsExecuting(true);
    const commands = sequence.split('');
    let tempState = currentRover;

    for (const cmd of commands) {
      if (tempState.isCrashed) break;

      tempState = executeCommand(tempState, cmd, INITIAL_GRID, obstacles);
      setRover(tempState);

      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsExecuting(false);
  };

  const getCommandsForDirection = (currentDir: Direction, targetDir: Direction): string => {
    const currentIdx = DIRECTIONS.indexOf(currentDir);
    const targetIdx = DIRECTIONS.indexOf(targetDir);
    
    const diff = (targetIdx - currentIdx + 4) % 4;

    switch (diff) {
      case 0: return 'M';
      case 1: return 'RM';
      case 2: return 'RRM';
      case 3: return 'LM';
      default: return '';
    }
  };

  const handleSmartMove = useCallback((targetDir: Direction) => {
    if (isExecuting || rover.isCrashed) return;
    const cmds = getCommandsForDirection(rover.direction, targetDir);
    executeSequence(cmds, rover);
  }, [rover, isExecuting, obstacles]);

  // Setup swipe gesture for touch devices
  const swipeHandlers = useSwipeGesture(handleSmartMove);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle touch mode demo with 't' key
      if (e.key === 't' || e.key === 'T') {
        setForceTouchMode(prev => !prev);
        return;
      }
      
      if (isExecuting || rover.isCrashed) return;

      switch(e.key) {
        case 'ArrowUp':
          handleSmartMove('N');
          break;
        case 'ArrowRight':
          handleSmartMove('E');
          break;
        case 'ArrowDown':
          handleSmartMove('S');
          break;
        case 'ArrowLeft':
          handleSmartMove('W');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSmartMove, isExecuting, rover.isCrashed, forceTouchMode]);

  return (
    <div className="min-h-screen bg-space-900 text-space-700 p-4 md:p-8 font-sans selection:bg-space-600 selection:text-space-900 flex flex-col items-center">
      <header className="mb-8 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center border-b border-space-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mars-500 to-mars-300 font-mono">
            MARS EXPLORER
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className={`px-4 py-2 rounded font-mono text-sm border transition-colors duration-300 ${rover.isCrashed ? 'border-red-500 bg-red-900/20 text-red-500 animate-pulse' : 'border-space-600 bg-space-800 text-space-600'}`}>
                STATUS: {rover.isCrashed ? 'CRITICAL FAILURE - REBOOTING...' : 'OPERATIONAL'}
            </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-start">
        <div className="flex-1 w-full max-w-lg">
          <Grid 
            rover={rover} 
            gridSize={INITIAL_GRID} 
            obstacles={obstacles}
            swipeHandlers={showTouchControls ? swipeHandlers : undefined}
          />
          {showTouchControls && (
            <div className="mt-2 text-xs text-space-500 text-center font-mono animate-pulse">
              👆 SWIPE ON GRID TO MOVE
            </div>
          )}
        </div>

        <div className="w-full md:w-80 flex flex-col gap-6">
          {showTouchControls ? (
            <TouchControls 
              onMove={handleSmartMove}
              disabled={isExecuting || rover.isCrashed}
            />
          ) : (
            <Controls 
              onReset={handleReset} 
              disabled={isExecuting || rover.isCrashed} 
            />
          )}
          
          {/* Always show reset button */}
          {showTouchControls && (
            <button
              onClick={handleReset}
              className="w-full py-3 bg-red-900/20 hover:bg-red-900 hover:text-white text-red-500 border border-red-900/50 rounded font-mono text-sm uppercase tracking-wider transition-all"
            >
              System Reset
            </button>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-space-800 text-xs font-mono">
        SECURE CONNECTION // LATENCY: 24m 32s // PROTOCOL: KATA-V2
        {!isTouchDevice && (
          <div className="mt-2 text-space-700">
            Press 'T' to toggle touch controls demo
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;