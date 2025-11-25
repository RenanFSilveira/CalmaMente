package com.calmamente.backend.repository;

import com.calmamente.backend.model.Diario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface DiarioRepository extends JpaRepository<Diario, UUID> {    
    List<Diario> findByUsuarioId(UUID usuarioId);
}