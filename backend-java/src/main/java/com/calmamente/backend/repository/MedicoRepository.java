package com.calmamente.backend.repository;

import com.calmamente.backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, UUID> {
        
    List<Medico> findByUsuario_NomeContainingIgnoreCase(String nome);    
    List<Medico> findByEspecialidadeContainingIgnoreCase(String especialidade);    
    List<Medico> findByUsuario_NomeContainingIgnoreCaseAndEspecialidadeContainingIgnoreCase(String nome, String especialidade);
}