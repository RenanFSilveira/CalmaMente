# Documentação da API - CalmaMente Backend

Esta documentação visa auxiliar o desenvolvimento do Frontend, detalhando os endpoints disponíveis, formatos de requisição/resposta e fluxos de autenticação.

## 🚀 Visão Geral

- **Base URL Local**: `http://localhost:8080`
- **Swagger UI**: `http://localhost:8080/swagger-ui.html` (Documentação interativa gerada automaticamente)
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

## 🔐 Autenticação

Atualmente, o backend **não possui Spring Security habilitado** explicitamente. A identificação dos usuários é feita passando o `ID` do usuário (UUID) nos endpoints ou no corpo da requisição.

> **Nota para o Frontend**: Certifique-se de obter o `UUID` do usuário após o login (seja via Supabase Auth ou outro provedor) e utilizá-lo nas chamadas que exigem identificação.

---

## 📡 Endpoints

### 1. Usuários (`/usuarios`)

Gerenciamento de usuários básicos.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/usuarios` | Lista todos os usuários cadastrados. |
| `GET` | `/usuarios/{id}` | Retorna os detalhes de um usuário específico. |
| `PUT` | `/usuarios/{id}` | Atualiza os dados do perfil do usuário. |

**Exemplo de Body (PUT):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999"
}
```

### 2. Médicos (`/medicos`)

Fluxos específicos para profissionais de saúde.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/medicos/completar-cadastro` | Finaliza o cadastro de um usuário como médico. |

**Exemplo de Body (POST):**
```json
{
  "usuarioId": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Dr. House",
  "telefone": "11988888888",
  "crm": "123456/SP",
  "cnpj": "00.000.000/0001-00",
  "especialidade": "Psiquiatria"
}
```

### 3. Agendamentos (`/agendamentos`)

Marcação de consultas.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/agendamentos` | Cria um novo agendamento. |
| `GET` | `/agendamentos` | Lista todos os agendamentos. |

**Exemplo de Body (POST):**
```json
{
  "medico": { "id": "uuid-do-medico" },
  "paciente": { "id": "uuid-do-paciente" },
  "dataHora": "2023-12-25T14:30:00",
  "status": "AGENDADO"
}
```

### 4. Conteúdos (`/conteudos`)

Materiais educativos e de apoio.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/conteudos` | Cria um novo conteúdo. |
| `GET` | `/conteudos` | Lista conteúdos. Filtros opcionais: `?tipo=VIDEO` ou `?categoria=Ansiedade`. |

**Tipos de Conteúdo**: `VIDEO`, `TEXTO`, `AUDIO`, etc. (Verificar Enum `TipoConteudo`)

### 5. Diário Emocional (`/diario`)

Registro diário de emoções e notas.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/diario` | Cria uma nova entrada no diário. |
| `GET` | `/diario/usuario/{id}` | Lista todas as entradas de um usuário específico. |

**Exemplo de Body (POST):**
```json
{
  "usuario": { "id": "uuid-do-usuario" },
  "texto": "Hoje me senti ansioso durante a reunião...",
  "humor": "ANSIOSO",
  "data": "2023-11-23"
}
```

### 6. Gamificação (`/gamificacao`)

Metas e pontuação.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/gamificacao/metas` | Cria uma nova meta para o usuário. |
| `GET` | `/gamificacao/metas/usuario/{id}` | Lista as metas de um usuário. |
| `POST` | `/gamificacao/metas/{id}/concluir` | Marca uma meta como concluída e atribui pontos. |

### 7. Notificações (`/notificacoes`)

Sistema de alertas (pode ser integrado com n8n ou sistemas externos).

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/notificacoes` | Cria uma notificação (Uso interno/Sistemas externos). |
| `GET` | `/notificacoes/usuario/{id}` | Lista notificações de um usuário. |
| `GET` | `/notificacoes/usuario/{id}/count` | Conta notificações não lidas. |
| `PUT` | `/notificacoes/{id}/ler` | Marca uma notificação como lida. |

---

## 🛠 Dicas para o Desenvolvedor Frontend

1.  **Datas**: O backend espera datas no formato ISO-8601 (ex: `2023-11-23T10:00:00`).
2.  **Erros**: Verifique o status HTTP. `404` para não encontrado, `400` para dados inválidos.
3.  **Swagger**: Use o Swagger UI (`/swagger-ui.html`) para testar os endpoints diretamente no navegador sem precisar codificar nada.
