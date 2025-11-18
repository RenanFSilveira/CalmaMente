package com.calmamente.backend.controller;

import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios") // Define que todos os endpoints começam com /usuarios
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    // POST /usuarios -> Cria um novo usuário
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        Usuario novoUsuario = service.criarUsuario(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    // GET /usuarios -> Lista todos (apenas para teste inicial)
    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        List<Usuario> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }
}