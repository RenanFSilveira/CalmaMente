export type AccountType = 'client' | 'doctor';

export interface FormData {
  // Passo 1: Dados da Conta (Condicional)
  accountType: AccountType; // 'client' (Pessoa Física) ou 'doctor' (Pessoa Jurídica)
  
  // Cliente (Pessoa Física)
  cpf: string;
  birthDate: string;
  phone: string;

  // Médico (Pessoa Jurídica) - Adicionais
  cnpj: string;
  medicalRegistration: string; 
  medicalType: "Psiquiatra" | "Psicologo" | "Neuropsiquiatra" | "Neurologista" | "TerapeutaOcupacional" | "Psicanalista" | "EnfermeiroPsiquiatrico" | "AssistenteSocial" | "Terapeuta"

  // Passo 2: Dados Pessoais
  fullName: string;
  gender: "Masculino" | "Feminino" | "Outros";
  profileImageUrl: string;

  // Passo 3: Endereço
  zipCode: string; 
  street: string; 
  neighborhood: string; 
  city: string; 
  state: string; 
  number: string; 
  complement: string;  

  // Passo 4: Dados de Acesso
  email: string;
  password: string;
  confirmPassword: string;
}

// O estado inicial
export const initialFormData: FormData = {
  accountType: 'client',
  cpf: '',
  birthDate: '',
  phone: '',
  cnpj: '',
  medicalRegistration: '',
  medicalType: 'Psiquiatra',
  fullName: '',
  gender: 'Masculino',
  profileImageUrl: '',
  zipCode: '',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  number: '',
  complement: '',
  email: '',
  password: '',
  confirmPassword: '',
};

