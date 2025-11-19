package com.calmamente.backend.service;

import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    // Método renomeado: Agora focamos em ATUALIZAR os dados extras
    public Usuario atualizarPerfil(UUID id, Usuario dadosAtualizados) {
        return repository.findById(id)
                .map(usuarioExistente -> {
                    // Atualiza apenas os campos permitidos
                    if(dadosAtualizados.getNome() != null) usuarioExistente.setNome(dadosAtualizados.getNome());
                    if(dadosAtualizados.getTelefone() != null) usuarioExistente.setTelefone(dadosAtualizados.getTelefone());
                    if(dadosAtualizados.getDataNascimento() != null) usuarioExistente.setDataNascimento(dadosAtualizados.getDataNascimento());
                    if(dadosAtualizados.getFotoPerfil() != null) usuarioExistente.setFotoPerfil(dadosAtualizados.getFotoPerfil());
                    if(dadosAtualizados.getGenero() != null) usuarioExistente.setGenero(dadosAtualizados.getGenero());
                    
                    // O Tipo e Email geralmente não mudam aqui, pois vêm do Auth
                    return repository.save(usuarioExistente);
                })
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado. Verifique se o cadastro no Auth foi concluído."));
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }
    
    public Optional<Usuario> buscarPorId(UUID id) {
        return repository.findById(id);
    }
}