package com.calmamente.backend.controller;

import com.calmamente.backend.model.Agendamento;
import com.calmamente.backend.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService service;

    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody Agendamento agendamento) {
        Agendamento novoAgendamento = service.criarAgendamento(agendamento);
        return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);
    }

    @GetMapping("/ocupados/{medicoId}")
    public ResponseEntity<List<Agendamento>> listarHorariosOcupados(
            @PathVariable UUID medicoId,
            @RequestParam LocalDateTime inicio, // Formato ISO: 2022-01-01T00:00:00
            @RequestParam LocalDateTime fim) {  // Formato ISO: 2022-01-31T23:59:59
        
        return ResponseEntity.ok(service.listarOcupados(medicoId, inicio, fim));
    }
}