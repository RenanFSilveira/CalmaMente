export interface AvailableAppointment {
    id: string;
    specialty: string; // Ex: Cardiologia
    doctor: string;    // Ex: Dr(a) Nome do Médico
    price: number;
}

export interface AppointmentItem {
    id: string;
    date: string; // Formato: "01/Dez, 14:00h"
    doctor: string;
    status: "Confirmada" | "Pendente" | "Cancelada";
}

// Se você precisar definir os tipos auxiliares da API:
export interface UserData {
    id: string;
    nome: string;
    email: string;
    // outros campos de usuário...
}

export interface DoctorAPIResponse {
    id: string; 
    usuario: UserData; 
    crm: string;
    especialidade: string;
    // outros campos...
}

export interface AppointmentAPIResponse {
    id: string;
    paciente: { id: string; nome: string; };
    profissional: { id: string; nome: string; };
    dataHora: string; 
    status: string; 
    observacoes: string;
    criadoEm: string;
}

export interface OccupiedSlotAPIResponse {
    id: string;
    dataHora: string; // O campo que você precisa
    status: string;
    // ... outros campos (paciente, profissional, etc.)
}