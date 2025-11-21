// components/ProgressTimeline.tsx

import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline'; // Usaremos Heroicons para o ícone de check

// 1. Definição da Interface (para cada passo da timeline)
export interface TimelineStep {
  /**
   * O título principal do passo.
   */
  title: string;
  /**
   * Uma breve descrição para o passo.
   */
  description: string;
  /**
   * O status do passo: 'completed', 'current' ou 'upcoming'.
   */
  status: 'completed' | 'current' | 'upcoming';
}

// 2. Definição da Interface (para o componente da timeline em si)
interface ProgressTimelineProps {
  /**
   * Um array de objetos TimelineStep, representando todos os passos.
   */
  steps: TimelineStep[];
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ steps }) => {
  return (
    <div className="relative text-white antialiased">
      {/* Linha vertical principal */}
      <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-600"></div>

      {steps.map((step, index) => (
        <div key={index} className="mb-6 flex items-start relative">
          {/* Círculo do status */}
          <div
            className={`
              relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
              ${step.status === 'completed' ? 'bg-indigo-600' : ''}
              ${step.status === 'current' ? 'bg-indigo-600 ring-2 ring-indigo-600 ring-offset-2 ring-offset-slate-900' : ''}
              ${step.status === 'upcoming' ? 'bg-gray-700 border border-gray-600' : ''}
              mr-4 transition-all duration-300 ease-in-out
            `}
          >
            {step.status === 'completed' && (
              <CheckCircleIcon className="h-5 w-5 text-white" />
            )}
            {step.status === 'current' && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
            {step.status === 'upcoming' && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
            )}
          </div>

          {/* Conteúdo do passo */}
          <div className="flex-grow pt-0.5">
            <h3
              className={`
                font-semibold
                ${step.status === 'completed' ? 'text-gray-300' : ''}
                ${step.status === 'current' ? 'text-white' : ''}
                ${step.status === 'upcoming' ? 'text-gray-500' : ''}
              `}
            >
              {step.title}
            </h3>
            <p
              className={`
                text-sm mt-0.5
                ${step.status === 'completed' ? 'text-gray-400' : ''}
                ${step.status === 'current' ? 'text-indigo-200' : ''}
                ${step.status === 'upcoming' ? 'text-gray-600' : ''}
              `}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTimeline;