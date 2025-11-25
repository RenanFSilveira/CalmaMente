import React, { useState } from 'react';

import CustomSelect from '@/components/CustomSelect'; 
// Assumindo que você tem o tipo AvailableAppointment
import {AvailableAppointment} from '@/types/appointment'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Não esqueça de importar o CSS!

// Opções de horários fixos
const TIME_OPTIONS = [
    { value: "08:00", label: "08:00h" },
    { value: "09:00", label: "09:00h" },
    { value: "10:00", label: "10:00h" },
    { value: "13:00", label: "13:00h" },
    { value: "14:00", label: "14:00h" },
    { value: "15:00", label: "15:00h" },
    { value: "16:30", label: "16:30h" },
];

// 1. Atualização da interface para receber occupiedSlots
interface ScheduleFormProps {
    selectedAppointment: AvailableAppointment;
    occupiedSlots: string[]; // Recebe a lista de horários ocupados (ex: 2025-12-03 16:00:00)
    onSubmit: (data: { date: string, time: string }) => void;
}

// 2. Desestruturar 'occupiedSlots'
const ScheduleForm: React.FC<ScheduleFormProps> = ({ occupiedSlots, onSubmit }) => {    
    // Mudamos 'date' para 'startDate' (objeto Date do DatePicker)
    const [startDate, setStartDate] = useState<Date | null>(null);     
    const [time, setTime] = useState('');

    // Função auxiliar para formatar a data local para YYYY-MM-DD (sem UTC)
    const getFormattedLocalDate = (dateObj: Date): string => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!startDate || !time) {
            alert("Por favor, selecione a data e o horário.");
            return;
        }
        
        // Formata a data local (YYYY-MM-DD)
        const formattedDate = getFormattedLocalDate(startDate);

        onSubmit({ date: formattedDate, time });
    };

    // 3. Lógica de Filtragem de Horários Ocupados
    const filteredTimeOptions = TIME_OPTIONS.filter(option => {
        
        // Se a data ainda não foi selecionada, não exibimos nada (ou, como aqui, todos disponíveis)
        if (!startDate) return true; 
        
        // Formata a data selecionada para YYYY-MM-DD
        const formattedDate = getFormattedLocalDate(startDate);
        
        // 🚨 CRUCIAL: Monta a string de verificação no formato do seu banco: YYYY-MM-DD HH:MM:SS
        const checkTime = `${formattedDate} ${option.value}:00`; 
        
        // Retorna TRUE se o horário NÃO estiver na lista de ocupados
        return !occupiedSlots.includes(checkTime);
    });
    

    return (
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-medium">Selecione Data e Hora</h3>
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="schedule_date">
                Data Desejada
            </label>
            <DatePicker
                id="schedule_date"
                selected={startDate}
                onChange={(date: Date | null) => {
                    setStartDate(date);
                    setTime(''); // Limpa o horário ao mudar a data
                }}
                minDate={new Date()} 
                dateFormat="dd/MM/yyyy"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholderText="Selecione uma data"
                required
            />
            
            <CustomSelect
                label="Horário"
                id="schedule_time"
                value={time}
                // 4. Usa a lista filtrada
                options={filteredTimeOptions}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTime(e.target.value)}
                required
            />
            
            <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
                Confirmar Agendamento
            </button>
        </form>
        
       
    );
};
export default ScheduleForm;