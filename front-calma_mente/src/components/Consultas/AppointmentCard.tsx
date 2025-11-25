// components/AppointmentCard.tsx

import React from 'react';
import { UserGroupIcon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { AvailableAppointment } from '@/types/appointment'; 

interface AppointmentCardProps {
    appointment: AvailableAppointment;
    isSelected: boolean;
    onSelect: (app: AvailableAppointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, isSelected, onSelect }) => {
    return (
        <div 
            onClick={() => onSelect(appointment)}
            className={`
                p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                shadow-md hover:shadow-lg 
                ${isSelected ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200' : 'border-gray-200 bg-white hover:border-indigo-300'}
            `}
        >
            <CalendarDaysIcon className={`w-8 h-8 mb-2 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />
            
            <h3 className="text-xl font-bold mb-1 text-gray-800" style={{color: "black"}}>
                {appointment.specialty}
            </h3>            
            
            <div className="flex items-center text-sm text-gray-600 mt-2">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                <span className="font-medium">{appointment.doctor}</span>
            </div>
            
            <div className="flex items-center text-lg font-extrabold text-green-600 mt-3" style={{color: "black"}}>
                <CurrencyDollarIcon className="w-5 h-5 mr-1" />
                R$ {appointment.price.toFixed(2)}
            </div>
            
            <button 
                className="mt-4 w-full py-2 text-white font-semibold rounded-lg transition-colors 
                bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {isSelected ? 'Selecionado' : 'Agendar'}
            </button>
        </div>
    );
};

export default AppointmentCard;