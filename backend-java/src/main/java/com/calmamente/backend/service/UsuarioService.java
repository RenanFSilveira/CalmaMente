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
        Usuario usuarioExistente = buscarUsuarioComRetry(id);

        // Atualiza apenas os campos permitidos
        if(dadosAtualizados.getNome() != null) usuarioExistente.setNome(dadosAtualizados.getNome());
        if(dadosAtualizados.getTelefone() != null) usuarioExistente.setTelefone(dadosAtualizados.getTelefone());
        if(dadosAtualizados.getDataNascimento() != null) usuarioExistente.setDataNascimento(dadosAtualizados.getDataNascimento());
        if(dadosAtualizados.getFotoPerfil() != null) usuarioExistente.setFotoPerfil(dadosAtualizados.getFotoPerfil());
        if(dadosAtualizados.getGenero() != null) usuarioExistente.setGenero(dadosAtualizados.getGenero());
        
        // O Tipo e Email geralmente não mudam aqui, pois vêm do Auth
        return repository.save(usuarioExistente);
    }

    private Usuario buscarUsuarioComRetry(UUID id) {
        int tentativas = 0;
        int maxTentativas = 5;
        long tempoEspera = 1000; // 1 segundo

        while (tentativas < maxTentativas) {
            Optional<Usuario> usuario = repository.findById(id);
            if (usuario.isPresent()) {
                return usuario.get();
            }

            try {
                System.out.println("Usuário " + id + " não encontrado. Tentativa " + (tentativas + 1) + "/" + maxTentativas + ". Aguardando...");
                Thread.sleep(tempoEspera);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Erro ao aguardar criação do usuário.", e);
            }
            tentativas++;
        }

        throw new RuntimeException("Usuário não encontrado após " + maxTentativas + " tentativas. Verifique se o cadastro no Auth foi concluído.");
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }
    
    public Optional<Usuario> buscarPorId(UUID id) {
        return repository.findById(id);
    }
}