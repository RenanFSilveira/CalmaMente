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
            @RequestParam LocalDateTime inicio, 
            @RequestParam LocalDateTime fim) { 
        
        return ResponseEntity.ok(service.listarOcupados(medicoId, inicio, fim));
    }

    
    @GetMapping("/meus/{usuarioId}")
    public ResponseEntity<List<Agendamento>> listarMinhas(@PathVariable UUID usuarioId) {
        return ResponseEntity.ok(service.listarMinhasConsultas(usuarioId));
    }

    @DeleteMapping("/usuario/{usuarioId}")
    public ResponseEntity<Void> excluirPorUsuario(@PathVariable UUID usuarioId) {
        long removidos = service.excluirAgendamentosPorUsuario(usuarioId);
        if (removidos > 0) {
            return ResponseEntity.noContent().build();
        } else {
            
            
            return ResponseEntity.notFound().build();
        }
    }
}