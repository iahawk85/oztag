import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Position } from '../types';

export function AddPlayerForm() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState<Position>('Link');
  const { addPlayer } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addPlayer(name.trim(), position);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player Name"
          className="flex-1 px-3 py-2 border rounded"
          required
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}
          className="px-3 py-2 border rounded"
        >
          <option value="Link">Link</option>
          <option value="Rover">Rover</option>
          <option value="Middle">Middle</option>
          <option value="Wing">Wing</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Player
        </button>
      </div>
    </form>
  );
}
