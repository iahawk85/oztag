export type Position = 'Link' | 'Rover' | 'Middle' | 'Wing';

export interface Player {
  id: string;
  name: string;
  position: Position;
  onField: boolean;
}

export interface GameState {
  players: Player[];
  addPlayer: (name: string, position: Position) => void;
  removePlayer: (id: string) => void;
  togglePlayerStatus: (id: string) => void;
  movePlayer: (id: string, toField: boolean) => boolean;
}
