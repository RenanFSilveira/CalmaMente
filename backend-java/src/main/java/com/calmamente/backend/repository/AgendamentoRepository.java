package com.calmamente.backend.repository;

import com.calmamente.backend.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    // Buscar agendamentos de um paciente específico
    List<Agendamento> findByPacienteId(UUID pacienteId);

    // Buscar agendamentos de um profissional específico
    List<Agendamento> findByProfissionalId(UUID profissionalId);

    List<Agendamento> findByProfissionalIdAndDataHoraBetween(UUID profissionalId, LocalDateTime inicio, LocalDateTime fim);

    // 👇 NOVOS MÉTODOS ADICIONADOS PARA LISTAGEM CRONOLÓGICA:
    
    // Para o Paciente: Traz onde ele é o paciente, ordenado (Próximas primeiro)
    List<Agendamento> findByPacienteIdOrderByDataHoraAsc(UUID pacienteId);

    // Para o Médico: Traz a agenda dele, ordenada
    List<Agendamento> findByProfissionalIdOrderByDataHoraAsc(UUID profissionalId);
}