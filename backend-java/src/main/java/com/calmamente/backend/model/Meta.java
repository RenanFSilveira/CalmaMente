package com.calmamente.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "meta")
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Short dificuldade; 

@Column(length = 50)
    private String categoria;

    @Column(length = 50)
    private String frequencia;

    private java.time.LocalTime horario;

    @Column(columnDefinition = "TEXT")
    private String motivacao;

    @Column(nullable = false)
    private Boolean ativa = true;

    @Column(name = "criada_em", updatable = false)
    private LocalDateTime criadaEm;

    @PrePersist
    protected void onCreate() {
        if (this.criadaEm == null) this.criadaEm = LocalDateTime.now();
    }
}