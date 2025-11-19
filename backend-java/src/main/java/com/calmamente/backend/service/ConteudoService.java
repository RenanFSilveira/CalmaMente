package com.calmamente.backend.service;

import com.calmamente.backend.model.Conteudo;
import com.calmamente.backend.model.TipoConteudo;
import com.calmamente.backend.repository.ConteudoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConteudoService {

    @Autowired
    private ConteudoRepository repository;

    public Conteudo criarConteudo(Conteudo conteudo) {
        return repository.save(conteudo);
    }

    public List<Conteudo> listarTodos() {
        return repository.findAll();
    }

    public List<Conteudo> listarPorTipo(TipoConteudo tipo) {
        return repository.findByTipo(tipo);
    }
    
    public List<Conteudo> listarPorCategoria(String categoria) {
        return repository.findByCategoria(categoria);
    }
}