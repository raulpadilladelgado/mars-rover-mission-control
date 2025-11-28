export type Direction = 'N' | 'E' | 'S' | 'W';

export interface Position {
  x: number;
  y: number;
}

export interface RoverState {
  position: Position;
  direction: Direction;
  isCrashed: boolean;
  path: Position[];
}

export interface GridSize {
  width: number;
  height: number;
}

export interface Obstacle {
  x: number;
  y: number;
}
