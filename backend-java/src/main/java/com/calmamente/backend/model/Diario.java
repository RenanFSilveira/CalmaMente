package com.calmamente.backend.model;

import jakarta.persistence.*;
import lombok.Data;
// Importações novas necessárias para o JSON funcionar:
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "diario")
public class Diario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoDiario tipo;

    // AQUI ESTÁ A MÁGICA:
    // Essa anotação diz ao Hibernate: "Trate essa String como um JSON ao falar com o banco"
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private String conteudo;

    @Column(nullable = false)
    private Boolean compartilhado = false;

    @Column(name = "humor_detectado")
    private String humorDetectado;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        if (this.dataCriacao == null) {
            this.dataCriacao = LocalDateTime.now();
        }
        if (this.compartilhado == null) {
            this.compartilhado = false;
        }
    }
}