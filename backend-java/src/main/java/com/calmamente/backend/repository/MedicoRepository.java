package com.calmamente.backend.repository;

import com.calmamente.backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, UUID> {
    
    // Busca médicos cujo nome do usuário contenha o texto (ignorando maiúsculas/minúsculas)
    List<Medico> findByUsuario_NomeContainingIgnoreCase(String nome);

    // Busca por especialidade exata (ignorando caixa)
    List<Medico> findByEspecialidadeContainingIgnoreCase(String especialidade);

    // Busca pelos dois ao mesmo tempo
    List<Medico> findByUsuario_NomeContainingIgnoreCaseAndEspecialidadeContainingIgnoreCase(String nome, String especialidade);
}