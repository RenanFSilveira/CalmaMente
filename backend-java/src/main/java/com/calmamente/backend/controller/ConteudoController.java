package com.calmamente.backend.controller;

import com.calmamente.backend.model.Conteudo;
import com.calmamente.backend.model.TipoConteudo;
import com.calmamente.backend.service.ConteudoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conteudos")
public class ConteudoController {

    @Autowired
    private ConteudoService service;

    @PostMapping
    public ResponseEntity<Conteudo> criar(@RequestBody Conteudo conteudo) {
        return new ResponseEntity<>(service.criarConteudo(conteudo), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Conteudo>> listar(
            @RequestParam(required = false) TipoConteudo tipo,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String titulo) { 
        
        
        if (titulo != null && !titulo.isBlank()) {
            
            return ResponseEntity.ok(service.buscarPorTitulo(titulo));
        }

        
        if (tipo != null) {
            return ResponseEntity.ok(service.listarPorTipo(tipo));
        }
        
        
        if (categoria != null) {
            return ResponseEntity.ok(service.listarPorCategoria(categoria));
        }

        
        return ResponseEntity.ok(service.listarTodos());
    }
}