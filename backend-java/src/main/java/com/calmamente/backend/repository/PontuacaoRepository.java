package com.calmamente.backend.repository;

import com.calmamente.backend.model.Pontuacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PontuacaoRepository extends JpaRepository<Pontuacao, UUID> {
    Optional<Pontuacao> findByUsuarioId(UUID usuarioId);
}