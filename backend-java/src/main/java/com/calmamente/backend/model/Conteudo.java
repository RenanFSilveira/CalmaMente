package com.calmamente.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "conteudo")
public class Conteudo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoConteudo tipo;

    @Column(length = 50)
    private String categoria; // Ex: "Ansiedade", "Sono", "Depressão"

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String url; // Link para o vídeo ou texto completo

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "data_publicacao", updatable = false)
    private LocalDateTime dataPublicacao;

    @PrePersist
    protected void onCreate() {
        if (this.dataPublicacao == null) {
            this.dataPublicacao = LocalDateTime.now();
        }
    }
}