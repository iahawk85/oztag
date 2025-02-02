import { useDraggable } from '@dnd-kit/core';
import { Player } from '../types';
import { useGame } from '../context/GameContext';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const { togglePlayerStatus } = useGame();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
    data: player,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded shadow-sm border-2 border-transparent hover:border-blue-500 cursor-move transition-all duration-200"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{player.name}</p>
          <p className="text-sm text-gray-600">{player.position}</p>
        </div>
        <button
          onClick={() => togglePlayerStatus(player.id)}
          className={`px-2 py-1 text-sm rounded ${
            player.onField
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors duration-200`}
        >
          {player.onField ? 'Bench' : 'Field'}
        </button>
      </div>
    </div>
  );
}
