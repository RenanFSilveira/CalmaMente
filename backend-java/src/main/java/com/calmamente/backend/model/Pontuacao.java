package com.calmamente.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "pontuacao")
public class Pontuacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    // Cada usuário tem apenas um registro de pontuação (OneToOne seria ideal, mas ManyToOne funciona bem e é simples)
    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true, nullable = false)
    private Usuario usuario;

    @Column(name = "pontos_totais")
    private Integer pontosTotais = 0;

    @Column(name = "nivel_atual")
    private Integer nivelAtual = 1;

    @Column(name = "data_ultima_atualizacao")
    private LocalDateTime dataUltimaAtualizacao;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.dataUltimaAtualizacao = LocalDateTime.now();
        if (this.pontosTotais == null) this.pontosTotais = 0;
        if (this.nivelAtual == null) this.nivelAtual = 1;
    }
}