package com.calmamente.backend.repository;

import com.calmamente.backend.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, UUID> {    
    List<Notificacao> findByUsuarioIdOrderByDataEnvioDesc(UUID usuarioId);        
    long countByUsuarioIdAndLidaFalse(UUID usuarioId);
}