import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Grid from './Grid';
import { RoverState, GridSize, Obstacle } from '../types';

describe('Component: Grid', () => {
  const gridSize: GridSize = { width: 5, height: 5 };
  const obstacles: Obstacle[] = [{ x: 2, y: 2 }];
  
  const baseRover: RoverState = {
    position: { x: 0, y: 0 },
    direction: 'N',
    isCrashed: false,
    path: [{ x: 0, y: 0 }]
  };

  it('renders the grid container', () => {
    render(<Grid rover={baseRover} gridSize={gridSize} obstacles={[]} />);
    expect(screen.getByText(/POS:/)).toBeInTheDocument();
  });

  it('renders the rover icon', () => {
    render(<Grid rover={baseRover} gridSize={gridSize} obstacles={[]} />);
    expect(screen.getByText('🏎️')).toBeInTheDocument();
  });

  it('renders obstacles', () => {
    render(<Grid rover={baseRover} gridSize={gridSize} obstacles={obstacles} />);
    expect(screen.getByText('🪨')).toBeInTheDocument();
  });

  it('displays crash state when rover is crashed', () => {
    const crashedRover = { ...baseRover, isCrashed: true };
    render(<Grid rover={crashedRover} gridSize={gridSize} obstacles={obstacles} />);
    expect(screen.getByText('💥')).toBeInTheDocument();
  });

  it('displays the current coordinates correctly', () => {
    const movedRover: RoverState = { ...baseRover, position: { x: 3, y: 4 }, direction: 'W' };
    render(<Grid rover={movedRover} gridSize={gridSize} obstacles={[]} />);
    
    expect(screen.getByText('3, 4')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
  });
});