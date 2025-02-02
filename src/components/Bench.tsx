import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { PlayerCard } from './PlayerCard';
import { useGame } from '../context/GameContext';

export function Bench() {
  const { players } = useGame();
  const { setNodeRef } = useDroppable({ id: 'bench' });
  const benchPlayers = players.filter(p => !p.onField);

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Bench</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {benchPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
