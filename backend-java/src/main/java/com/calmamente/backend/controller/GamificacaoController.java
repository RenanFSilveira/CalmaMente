package com.calmamente.backend.controller;

import com.calmamente.backend.model.Meta;
import com.calmamente.backend.model.Pontuacao;
import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.service.GamificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/gamificacao")
public class GamificacaoController {

    @Autowired
    private GamificacaoService service;

    // 1. Criar Meta
    @PostMapping("/metas")
    public ResponseEntity<Meta> criarMeta(@RequestBody Meta meta) {
        return new ResponseEntity<>(service.criarMeta(meta), HttpStatus.CREATED);
    }

    // 2. Listar Metas (Retorna Lista de Metas)
    @GetMapping("/metas/usuario/{usuarioId}")
    public ResponseEntity<List<Meta>> listarMetas(@PathVariable UUID usuarioId) {
        return ResponseEntity.ok(service.listarMetas(usuarioId));
    }

    // 3. Ver Pontuação (Retorna Pontos e Nível)
    @GetMapping("/pontuacao/{usuarioId}")
    public ResponseEntity<Pontuacao> verPontuacao(@PathVariable UUID usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return ResponseEntity.ok(service.obterPontuacao(usuario));
    }

    // 4. Concluir Meta
    @PostMapping("/metas/{id}/concluir")
    public ResponseEntity<Pontuacao> concluirMeta(@PathVariable UUID id) {
        Pontuacao pontuacaoAtualizada = service.concluirMeta(id);
        return ResponseEntity.ok(pontuacaoAtualizada);
    }
}