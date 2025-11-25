// src/types/user.ts (Exemplo)

export interface UserProfile {
    id: string | null;
    email: string | null;
    // Baseado na sua tabela 'usuario', onde 'tipo' é o papel (role)
    tipo: string | null; 
}

export const INITIAL_PROFILE: UserProfile = {
    id: null,
    email: null,
    tipo: null,
};