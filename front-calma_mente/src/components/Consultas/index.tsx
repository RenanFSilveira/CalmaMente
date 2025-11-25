// app/(App)/consultas/page.tsx (Este é um Server Component por padrão)

import { getAuthPayload } from '@/lib/auth'; // Roda no Server
import AppointmentClientPage from '@/components/Consultas/AppointmentPage'; // O componente Cliente

export default async function ConsultasPage() {
    // 1. CHAMA A AUTENTICAÇÃO NO LADO DO SERVIDOR (SC)
    const user = await getAuthPayload(); 

    // 2. REDIRECIONAMENTO DE SEGURANÇA (Se falhar, mesmo com Middleware)
    if (!user) {

        return <div>Erro: Acesso Negado ou Sessão Inválida.</div>;
    }

    // 3. PASSA OS DADOS NECESSÁRIOS COMO PROPS PARA O COMPONENTE CLIENTE
    return (
        <AppointmentClientPage 
            userId={user.id}             
        />
    );
}