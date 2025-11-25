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
    
    public List<Agendamento> listarMinhasConsultas(UUID usuarioId) {        
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (usuario.getTipo() == TipoUsuario.profissional) {            
            return repository.findByProfissionalIdOrderByDataHoraAsc(usuarioId);
        } else {            
            return repository.findByPacienteIdOrderByDataHoraAsc(usuarioId);
        }
    }
    public long excluirAgendamentosPorUsuario(UUID usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (usuario.getTipo() == TipoUsuario.profissional) {
            return repository.deleteByProfissionalId(usuarioId);
        } else {
            return repository.deleteByPacienteId(usuarioId);
        }
    }
}