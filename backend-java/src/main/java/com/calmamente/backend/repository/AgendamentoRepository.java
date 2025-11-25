package com.calmamente.backend.repository;

import com.calmamente.backend.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    List<Agendamento> findByPacienteId(UUID pacienteId);

    List<Agendamento> findByProfissionalId(UUID profissionalId);

    List<Agendamento> findByProfissionalIdAndDataHoraBetween(UUID profissionalId, LocalDateTime inicio, LocalDateTime fim);
    
    List<Agendamento> findByPacienteIdOrderByDataHoraAsc(UUID pacienteId);

    List<Agendamento> findByProfissionalIdOrderByDataHoraAsc(UUID profissionalId);

    long deleteByPacienteId(UUID pacienteId);

    long deleteByProfissionalId(UUID profissionalId);
}