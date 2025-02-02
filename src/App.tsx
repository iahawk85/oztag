import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { AddPlayerForm } from './components/AddPlayerForm';
import { Field } from './components/Field';
import { Bench } from './components/Bench';
import { useGame } from './context/GameContext';

function App() {
  const { movePlayer } = useGame();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const playerId = active.id as string;
    const toField = over.id === 'field';

    movePlayer(playerId, toField);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen p-4 md:p-8 bg-gray-50">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Oztag Substitution Manager
          </h1>
        </header>
        <main className="max-w-6xl mx-auto space-y-6">
          <AddPlayerForm />
          <div className="grid gap-6">
            <Field />
            <Bench />
          </div>
        </main>
      </div>
    </DndContext>
  );
}

export default App;
