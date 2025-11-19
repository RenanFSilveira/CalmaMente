package com.calmamente.backend.repository;

import com.calmamente.backend.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, UUID> {
    // Listar notificações do usuário ordenadas da mais recente para a mais antiga
    List<Notificacao> findByUsuarioIdOrderByDataEnvioDesc(UUID usuarioId);
    
    // Contar quantas não foram lidas (para mostrar a bolinha vermelha no sino)
    long countByUsuarioIdAndLidaFalse(UUID usuarioId);
}