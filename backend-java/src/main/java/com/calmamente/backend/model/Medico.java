package com.calmamente.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "medico")
public class Medico {

    @Id
    private UUID id; 

    @OneToOne
    @MapsId 
    @JoinColumn(name = "id")
    private Usuario usuario;

    @Column(nullable = false, unique = true)
    private String crm;

    @Column(unique = true)
    private String cnpj;
    
    private String especialidade;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    protected void onCreate() {
        if (this.criadoEm == null) this.criadoEm = LocalDateTime.now();
    }
}