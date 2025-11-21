// components/CustomInput.tsx

import React, { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';
import InputMask from 'react-input-mask';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;  
  icon?: ReactNode; 
  icon2?: ReactNode;   
  mask?: string;
  placeholder?: string;  
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;  
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  icon2,
  mask,
  className,
  ...rest // Coleta todas as outras props nativas (type, value, id, placeholder, etc.)
}) => { 
  const inputBaseClasses = `
    w-full p-1 px-3 outline-none bg-transparent 
    text-gray-900 placeholder-gray-500 transition-colors duration-200
    focus:border-indigo-500 border-b border-gray-300
    
  `;    
    
  const containerClasses = `
    w-full flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm
    ${className || ''}
  `;

  return (
    <label htmlFor={rest.id || rest.name} >
        {label}
        <div className={containerClasses}>
            {icon && (
                <div className="flex-shrink-0 text-gray-500 ">
                {icon}
                </div>
            )}

        
            {mask ? (
                
                <InputMask
                mask={mask} 
                aria-label={label}
                {...rest}
                >
                {(inputProps: any) => (
                    <input
                    {...inputProps}
                    className={inputBaseClasses}
                    />
                )}
                </InputMask>
            ) : (        
                <input
                aria-label={label}
                className={inputBaseClasses}
                {...rest}
                />
            )}

            {icon2 && (
                <div className="flex-shrink-0 text-gray-500 ">
                {icon2}
                </div>
            )}
                    
            {rest.required && (
                <span className="text-red-500 text-lg flex-shrink-0" title="Obrigatório">
                *
                </span>
            )}
        </div>

      
    </label>
  );
};
export default CustomInput;