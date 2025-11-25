package com.calmamente.backend.controller;

import com.calmamente.backend.model.Diario;
import com.calmamente.backend.service.DiarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/diario")
public class DiarioController {

    @Autowired
    private DiarioService service;

    @PostMapping
    public ResponseEntity<Diario> criar(@RequestBody Diario diario) {
        Diario novaEntrada = service.criarEntrada(diario);
        return new ResponseEntity<>(novaEntrada, HttpStatus.CREATED);
    }
    
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Diario>> listarDoUsuario(@PathVariable UUID id) {
        return ResponseEntity.ok(service.listarPorUsuario(id));
    }
}