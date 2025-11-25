// pages/journal/index.tsx (ou components/JournalPage.tsx)

'use client';

import React, { useState } from 'react';
import TipTapEditor from './TipTapEditor';
import { BookOpenIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

const DUMMY_ENTRIES: JournalEntry[] = [
  { id: 1, title: "Reflexão sobre a semana", content: "<p>A semana foi produtiva, mas estressante. Preciso focar mais no descanso ativo.</p>", date: "2025-11-18" },
  { id: 2, title: "Metas para o próximo mês", content: "<p>Definir objetivos SMART para o projeto.</p><ul><li>Revisar o código</li><li>Finalizar o design</li></ul>", date: "2025-11-15" },
];

const DiarioEmocional: React.FC = () => {
  // Estado para a nova entrada
  const [newContent, setNewContent] = useState('');
  const [newTitle, setNewTitle] = useState('');
  
  // Estado para a lista de diários escritos
  const [entries, setEntries] = useState<JournalEntry[]>(DUMMY_ENTRIES);
  
  // Estado para visualizar um diário salvo (não é o mesmo que 'newContent')
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);

  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Título e conteúdo do diário não podem estar vazios.");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent,
      date: new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    setEntries([newEntry, ...entries]); // Adiciona a nova entrada
    
    // Limpar o editor
    setNewTitle('');
    setNewContent('');
    setViewingEntry(null); // Fecha a visualização se estiver aberta
    alert("Diário salvo com sucesso!");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta entrada?")) {
      setEntries(entries.filter(e => e.id !== id));
      if (viewingEntry?.id === id) {
        setViewingEntry(null);
      }
    }
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setViewingEntry(entry);
  };
  
  // Função para abrir o editor de nova entrada e limpar a visualização
  const startNewEntry = () => {
      setViewingEntry(null);
      setNewTitle('');
      setNewContent('');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-4">
        Diário emocional
      </h1>

      <div className="flex gap-8">
        
        {/* 📌 COLUNA ESQUERDA: LISTA DE DIÁRIOS ESCRITOS */}
        <div className="w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Meu Diário</h2>
          
          <button 
            onClick={startNewEntry}
            className="w-full flex items-center justify-center p-3 mb-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Criar Nova Entrada
          </button>
          
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {entries.map(entry => (
              <div
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex justify-between items-center
                  ${viewingEntry?.id === entry.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-100'}
                `}
              >
                <div>
                    <p className="font-semibold text-gray-800">{entry.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                    className="text-red-400 hover:text-red-600 transition-colors p-1 rounded"
                    title="Excluir"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 📌 COLUNA DIREITA: EDITOR / VISUALIZADOR */}
        <div className="w-2/3 space-y-4">
            
            {viewingEntry ? (
                // MODO DE VISUALIZAÇÃO
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">{viewingEntry.title}</h2>
                    <p className="text-sm text-gray-600 border-b pb-2">Visualizando entrada de: {viewingEntry.date}</p>
                    <TipTapEditor
                        // content={viewingEntry.content}
                        // onContentChange={() => {}} // Não permite edição, então o handler é vazio
                        // editable={false}
                    />
                </div>

            ) : (
                // MODO DE CRIAÇÃO
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-indigo-700">Nova Entrada</h2>
                    
                    <input
                        type="text"
                        placeholder="Digite o título do seu diário..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-indigo-500 focus:border-indigo-500"
                        maxLength={100}
                    />
                    
                    <TipTapEditor
                        // content={newContent}
                        // onContentChange={setNewContent}
                        // editable={true} // Permite edição
                    />
                    
                    <button 
                        onClick={handleSave}
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors"
                    >
                        Salvar Diário
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiarioEmocional;