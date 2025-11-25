// forms/ConfirmationForm.tsx

import React from 'react';
import { FormData } from '@/types/form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ConfirmationFormProps {
  /** O objeto de estado completo com todos os dados do formulário */
  data: FormData;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ data }) => {
  const isDoctor = data.accountType === 'doctor';

  // Função auxiliar para exibir campos de forma consistente
  const renderField = (label: string, value: string) => (
    <div className="flex justify-between items-start py-2 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-900 font-semibold max-w-[50%] text-right">{value || 'Não informado'}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
        <CheckCircleIcon className="h-6 w-6" /> 
        Revisão e Confirmação
      </h2>
      <p className="text-gray-500 mb-4">
        Por favor, revise os dados abaixo antes de finalizar o cadastro. Você poderá editá-los mais tarde.
      </p>

      {/* 📌 SEÇÃO 1: DADOS DA CONTA */}
      <h3 className="text-lg font-semibold mt-4 border-b pb-1">Dados da Conta</h3>
      {renderField("Tipo de Conta", isDoctor ? "Médico (Pessoa Jurídica)" : "Cliente (Pessoa Física)")}
      
      {/* Campos Condicionais */}
      {isDoctor ? (
        <>
          {renderField("CNPJ", data.cnpj)}
          {renderField("Registro Médico (CRM)", data.medicalRegistration)}
          {renderField("Especialidade", data.medicalType)}
        </>
      ) : (
        renderField("CPF", data.cpf)
      )}
      {renderField("Data de Nascimento", data.birthDate)}
      {renderField("Celular", data.phone)}
      
      {/* 📌 SEÇÃO 2: DADOS PESSOAIS */}
      <h3 className="text-lg font-semibold mt-4 border-b pb-1">Dados Pessoais</h3>
      {renderField("Nome Completo", data.fullName)}
      {renderField("Gênero", data.gender)}
      {/* Nota: Imagem de perfil é visual, não precisa de texto aqui, mas o URL estaria em data.profileImageUrl */}

      {/* 📌 SEÇÃO 3: ENDEREÇO */}
      <h3 className="text-lg font-semibold mt-4 border-b pb-1">Endereço</h3>
      {renderField("CEP", data.zipCode)}
      {renderField("Rua/Avenida", data.street)}
      {renderField("Número", data.number)}
      {renderField("Bairro", data.neighborhood)}
      {renderField("Cidade/UF", `${data.city} / ${data.state}`)}
      {data.complement && renderField("Complemento", data.complement)}

      {/* 📌 SEÇÃO 4: ACESSO */}
      <h3 className="text-lg font-semibold mt-4 border-b pb-1">Dados de Acesso</h3>
      {renderField("Email", data.email)}
      {renderField("Senha", "•••••••• (Não exibida por segurança)")}

      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
          Ao clicar em **Finalizar**, você confirma que todos os dados estão corretos e aceita nossos termos de serviço.
      </div>
    </div>
  );
};

export default ConfirmationForm;