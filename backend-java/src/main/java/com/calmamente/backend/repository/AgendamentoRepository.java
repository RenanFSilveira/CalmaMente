package com.calmamente.backend.repository;

import com.calmamente.backend.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    // Buscar agendamentos de um paciente específico
    List<Agendamento> findByPacienteId(UUID pacienteId);

    // Buscar agendamentos de um profissional específico
    List<Agendamento> findByProfissionalId(UUID profissionalId);
}