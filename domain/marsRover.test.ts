import { describe, it, expect } from 'vitest';
import { rotate, getNextPosition, executeCommand, isCollision } from './marsRover';
import { GridSize, RoverState, Obstacle } from '../types';

describe('Domain: Mars Rover Logic', () => {
  const grid: GridSize = { width: 10, height: 10 };
  const obstacles: Obstacle[] = [];

  describe('Rotation', () => {
    it('should rotate Right correctly', () => {
      expect(rotate('N', 'R')).toBe('E');
      expect(rotate('E', 'R')).toBe('S');
      expect(rotate('S', 'R')).toBe('W');
      expect(rotate('W', 'R')).toBe('N');
    });

    it('should rotate Left correctly', () => {
      expect(rotate('N', 'L')).toBe('W');
      expect(rotate('W', 'L')).toBe('S');
      expect(rotate('S', 'L')).toBe('E');
      expect(rotate('E', 'L')).toBe('N');
    });
  });

  describe('Movement & Wrapping (Spherical Planet)', () => {
    it('should move North', () => {
      expect(getNextPosition({ x: 5, y: 5 }, 'N', grid)).toEqual({ x: 5, y: 6 });
    });

    it('should move East', () => {
      expect(getNextPosition({ x: 5, y: 5 }, 'E', grid)).toEqual({ x: 6, y: 5 });
    });

    it('should move South', () => {
      expect(getNextPosition({ x: 5, y: 5 }, 'S', grid)).toEqual({ x: 5, y: 4 });
    });

    it('should move West', () => {
      expect(getNextPosition({ x: 5, y: 5 }, 'W', grid)).toEqual({ x: 4, y: 5 });
    });

    it('should wrap around the grid (North Edge)', () => {
      expect(getNextPosition({ x: 5, y: 9 }, 'N', grid)).toEqual({ x: 5, y: 0 });
    });

    it('should wrap around the grid (South Edge)', () => {
      expect(getNextPosition({ x: 5, y: 0 }, 'S', grid)).toEqual({ x: 5, y: 9 });
    });

    it('should wrap around the grid (East Edge)', () => {
      expect(getNextPosition({ x: 9, y: 5 }, 'E', grid)).toEqual({ x: 0, y: 5 });
    });

    it('should wrap around the grid (West Edge)', () => {
      expect(getNextPosition({ x: 0, y: 5 }, 'W', grid)).toEqual({ x: 9, y: 5 });
    });
  });

  describe('Collisions', () => {
    it('should detect a collision', () => {
      const obs: Obstacle[] = [{ x: 5, y: 6 }];
      expect(isCollision({ x: 5, y: 6 }, obs)).toBe(true);
    });

    it('should not detect collision if path is clear', () => {
      const obs: Obstacle[] = [{ x: 5, y: 6 }];
      expect(isCollision({ x: 5, y: 5 }, obs)).toBe(false);
    });
  });

  describe('Execute Command', () => {
    const initialState: RoverState = {
      position: { x: 0, y: 0 },
      direction: 'N',
      isCrashed: false,
      path: [{ x: 0, y: 0 }]
    };

    it('should execute a move command', () => {
      const newState = executeCommand(initialState, 'M', grid, obstacles);
      expect(newState.position).toEqual({ x: 0, y: 1 });
      expect(newState.path).toHaveLength(2);
    });

    it('should execute a rotation command', () => {
      const newState = executeCommand(initialState, 'R', grid, obstacles);
      expect(newState.direction).toBe('E');
      expect(newState.position).toEqual({ x: 0, y: 0 }); // Position shouldn't change
    });

    it('should stop and mark crashed if hitting an obstacle', () => {
      const obs: Obstacle[] = [{ x: 0, y: 1 }];
      const newState = executeCommand(initialState, 'M', grid, obs);
      expect(newState.isCrashed).toBe(true);
      expect(newState.position).toEqual({ x: 0, y: 0 }); // Should not have moved into obstacle
    });

    it('should ignore commands if already crashed', () => {
      const crashedState = { ...initialState, isCrashed: true };
      const newState = executeCommand(crashedState, 'M', grid, obstacles);
      expect(newState).toBe(crashedState); // Strict equality check (immutability)
    });
  });
});