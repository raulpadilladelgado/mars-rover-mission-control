import { Direction, RoverState, GridSize, Obstacle, Position } from '../types';

export const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

export const rotate = (currentDir: Direction, turn: 'L' | 'R'): Direction => {
  const index = DIRECTIONS.indexOf(currentDir);
  if (turn === 'R') {
    return DIRECTIONS[(index + 1) % 4];
  } else {
    return DIRECTIONS[(index + 3) % 4];
  }
};

export const getNextPosition = (
  position: Position,
  direction: Direction,
  grid: GridSize
): Position => {
  let { x, y } = position;

  switch (direction) {
    case 'N':
      y = (y + 1) % grid.height;
      break;
    case 'E':
      x = (x + 1) % grid.width;
      break;
    case 'S':
      y = (y - 1 + grid.height) % grid.height;
      break;
    case 'W':
      x = (x - 1 + grid.width) % grid.width;
      break;
  }

  return { x, y };
};

export const isCollision = (position: Position, obstacles: Obstacle[]): boolean => {
  return obstacles.some(obs => obs.x === position.x && obs.y === position.y);
};

export const executeCommand = (
  state: RoverState,
  command: string,
  grid: GridSize,
  obstacles: Obstacle[]
): RoverState => {
  if (state.isCrashed) return state;

  const validCommand = command.toUpperCase();
  const newState = { ...state, path: [...state.path] };

  switch (validCommand) {
    case 'L':
    case 'R':
      newState.direction = rotate(state.direction, validCommand);
      break;
    case 'M':
      const nextPos = getNextPosition(state.position, state.direction, grid);
      if (isCollision(nextPos, obstacles)) {
        newState.isCrashed = true;
      } else {
        newState.position = nextPos;
        newState.path.push(nextPos);
      }
      break;
    default:
      break;
  }

  return newState;
};

export const generateObstacles = (count: number, grid: GridSize): Obstacle[] => {
  const obstacles: Obstacle[] = [];
  while (obstacles.length < count) {
    const x = Math.floor(Math.random() * grid.width);
    const y = Math.floor(Math.random() * grid.height);
    
    if ((x !== 0 || y !== 0) && !obstacles.some(o => o.x === x && o.y === y)) {
      obstacles.push({ x, y });
    }
  }
  return obstacles;
};
