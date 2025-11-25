package com.calmamente.backend.controller;

import com.calmamente.backend.model.Notificacao;
import com.calmamente.backend.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notificacoes")
public class NotificacaoController {

    @Autowired
    private NotificacaoService service;
    
    @PostMapping
    public ResponseEntity<Notificacao> criar(@RequestBody Notificacao notificacao) {
        return new ResponseEntity<>(service.criarNotificacao(notificacao), HttpStatus.CREATED);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Notificacao>> listar(@PathVariable UUID id) {
        return ResponseEntity.ok(service.listarPorUsuario(id));
    }
    
    @GetMapping("/usuario/{id}/count")
    public ResponseEntity<Long> contarNaoLidas(@PathVariable UUID id) {
        return ResponseEntity.ok(service.contarNaoLidas(id));
    }

    @PutMapping("/{id}/ler")
    public ResponseEntity<Notificacao> marcarComoLida(@PathVariable UUID id) {
        return ResponseEntity.ok(service.marcarComoLida(id));
    }
}