package com.calmamente.backend.service;

import com.calmamente.backend.model.Agendamento;
import com.calmamente.backend.model.Usuario;     // Import Novo
import com.calmamente.backend.model.TipoUsuario; // Import Novo
import com.calmamente.backend.repository.AgendamentoRepository;
import com.calmamente.backend.repository.UsuarioRepository; // Import Novo
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository; // 👇 Injeção necessária

    public Agendamento criarAgendamento(Agendamento agendamento) {
        return repository.save(agendamento);
    }

    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }

    public List<Agendamento> listarOcupados(UUID medicoId, LocalDateTime inicio, LocalDateTime fim) {
        return repository.findByProfissionalIdAndDataHoraBetween(medicoId, inicio, fim);
    }

    // 👇 NOVO MÉTODO: Lógica de Decisão (Médico vs Paciente)
    public List<Agendamento> listarMinhasConsultas(UUID usuarioId) {
        // 1. Busca o usuário para saber quem ele é
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 2. Verifica o tipo e faz a busca correta no repositório
        if (usuario.getTipo() == TipoUsuario.profissional) {
            // Se for médico, busca na coluna 'profissional_id'
            return repository.findByProfissionalIdOrderByDataHoraAsc(usuarioId);
        } else {
            // Se for paciente, busca na coluna 'paciente_id'
            return repository.findByPacienteIdOrderByDataHoraAsc(usuarioId);
        }
    }
}