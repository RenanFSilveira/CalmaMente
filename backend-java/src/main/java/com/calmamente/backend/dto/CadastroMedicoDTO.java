package com.calmamente.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonFormat; 

@Data
public class CadastroMedicoDTO {
    
    private UUID usuarioId; 
    
    
    private String nome;
    private String telefone;
    
    
    private String cpf;
    private String genero;

    @JsonFormat(pattern = "dd/MM/yyyy") 
    private LocalDate dataNascimento;
    
    
    
    private String crm;
    private String cnpj;
    private String especialidade;
}