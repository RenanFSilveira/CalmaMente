package com.calmamente.backend.dto;

import lombok.Data;

@Data
public class CadastroMedicoDTO {
    // Dados para auth.users (O Java não salva direto, mas precisa receber se fosse criar via API externa)
    // OBS: No fluxo sugerido abaixo, o ID já vem do front/auth
    private java.util.UUID usuarioId; 
    
    // Dados para public.usuario
    private String nome;
    private String telefone;
    
    // Dados para public.medico
    private String crm;
    private String cnpj;
    private String especialidade;
}