package com.calmamente.backend.service;

import com.calmamente.backend.model.Agendamento;
import com.calmamente.backend.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;

    public Agendamento criarAgendamento(Agendamento agendamento) {
        // Aqui futuramente validaremos se o horário está livre
        return repository.save(agendamento);
    }

    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }

    public List<Agendamento> listarOcupados(UUID medicoId, LocalDateTime inicio, LocalDateTime fim) {
    return repository.findByProfissionalIdAndDataHoraBetween(medicoId, inicio, fim);
}
}