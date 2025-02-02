import { createContext, useContext, useState } from 'react';
import { GameState, Player, Position } from '../types';

const GameContext = createContext<GameState | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (name: string, position: Position) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      position,
      onField: false,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const togglePlayerStatus = (id: string) => {
    const player = players.find(p => p.id === id);
    if (!player) return;

    const playersInPosition = players.filter(
      p => p.position === player.position && p.onField && p.id !== id
    );

    if (!player.onField && playersInPosition.length >= 2) {
      alert(`Maximum of 2 players allowed in ${player.position} position`);
      return;
    }

    setPlayers(players.map(p =>
      p.id === id ? { ...p, onField: !p.onField } : p
    ));
  };

  const movePlayer = (id: string, toField: boolean): boolean => {
    const player = players.find(p => p.id === id);
    if (!player) return false;

    if (toField) {
      const playersInPosition = players.filter(
        p => p.position === player.position && p.onField
      );
      if (playersInPosition.length >= 2) return false;
    }

    setPlayers(players.map(p =>
      p.id === id ? { ...p, onField: toField } : p
    ));
    return true;
  };

  return (
    <GameContext.Provider value={{ 
      players, 
      addPlayer, 
      removePlayer, 
      togglePlayerStatus,
      movePlayer 
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
