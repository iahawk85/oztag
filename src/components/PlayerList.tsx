import React from 'react';
import { useGame } from '../context/GameContext';
import { Position } from '../types';

export function PlayerList() {
  const { players, togglePlayerStatus } = useGame();

  const positions: Position[] = ['Link', 'Rover', 'Middle', 'Wing'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {positions.map(position => (
        <div key={position} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{position}</h3>
          <div className="space-y-2">
            {players
              .filter(player => player.position === position)
              .map(player => (
                <div
                  key={player.id}
                  className={`p-2 rounded ${
                    player.onField ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{player.name}</span>
                    <button
                      onClick={() => togglePlayerStatus(player.id)}
                      className="px-2 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      {player.onField ? 'Bench' : 'Field'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
