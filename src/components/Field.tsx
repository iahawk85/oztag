import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Position } from '../types';
import { PlayerCard } from './PlayerCard';
import { useGame } from '../context/GameContext';

export function Field() {
  const { players } = useGame();
  const { setNodeRef } = useDroppable({ id: 'field' });
  const positions: Position[] = ['Link', 'Rover', 'Middle', 'Wing'];

  return (
    <div ref={setNodeRef} className="bg-green-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Field</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {positions.map(position => (
          <div key={position} className="bg-white p-3 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{position}</h3>
            <div className="space-y-2">
              {players
                .filter(p => p.position === position && p.onField)
                .map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
