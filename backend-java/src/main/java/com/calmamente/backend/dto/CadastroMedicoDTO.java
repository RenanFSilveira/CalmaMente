package com.calmamente.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonFormat; // Importante para a data

@Data
public class CadastroMedicoDTO {
    // Dados para auth.users
    private UUID usuarioId; 
    
    // Dados para public.usuario
    private String nome;
    private String telefone;
    
    // --- NOVOS CAMPOS ADICIONADOS ---
    private String cpf;
    private String genero;

    @JsonFormat(pattern = "dd/MM/yyyy") // Aceita "21/03/2002"
    private LocalDate dataNascimento;
    // --------------------------------
    
    // Dados para public.medico
    private String crm;
    private String cnpj;
    private String especialidade;
}