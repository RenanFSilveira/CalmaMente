package com.calmamente.backend.controller;

import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable UUID id, @RequestBody Usuario usuario) {
        System.out.println("--- RECEBENDO PUT /usuarios/" + id + " ---");
        System.out.println("Payload recebido: " + usuario);
        
        Usuario atualizado = service.atualizarPerfil(id, usuario);
        return ResponseEntity.ok(atualizado);
    }
}