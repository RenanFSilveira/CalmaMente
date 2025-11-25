// components/StepIndicator.tsx

import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

export interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (    
    <div className="relative text-white antialiased">       
      <div className="absolute  top-0 bottom-0 w-0.5 bg-violet-300" style={{left: "13px"}}></div>
 
      {steps.map((step) => {
        const isCurrent = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
        let circleClasses = 'relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-all duration-300 ease-in-out';
        
        if (isCompleted) {
          circleClasses += ' bg-violet-800'; 
        } else if (isCurrent) {          
          circleClasses += ' bg-violet-600 ring-2 ring-violet-400 ring-opacity-50 ring-offset-2 ring-offset-violet-600';
        } else {
          circleClasses += ' bg-violet-400 border border-violet-800'; 
        }
        
        const labelClasses = `
          font-semibold pt-0.5 transition-colors duration-300
          ${isCompleted ? 'text-gray-400' : ''}
          ${isCurrent ? 'text-violet-800 font-bold' : ''}
          ${!isCompleted && !isCurrent ? 'text-gray-500' : ''}
        `;

        return (
          <div key={step.id} className="mb-6 flex items-start relative">
            
            
            <div className={circleClasses}>
              {isCompleted && (
                <CheckIcon className="h-4 w-4 text-white" />
              )}
              {isCurrent && (
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              )}
              {!isCompleted && !isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-violet-800"></div>
              )}
            </div>

            
            <div className="flex-grow">
              <span className={labelClasses}>
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;