package com.calmamente.backend.service;

import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario criarUsuario(Usuario usuario) {
        // Aqui poderíamos verificar se o email já existe, etc.
        // Por enquanto, vamos apenas salvar.
        return repository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }
    
    public Optional<Usuario> buscarPorId(java.util.UUID id) {
        return repository.findById(id);
    }
}