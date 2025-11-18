package com.calmamente.backend.service;

import com.calmamente.backend.model.Diario;
import com.calmamente.backend.repository.DiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DiarioService {

    @Autowired
    private DiarioRepository repository;

    public Diario criarEntrada(Diario diario) {
        // Aqui futuramente entrará a IA para preencher 'humorDetectado'
        return repository.save(diario);
    }

    public List<Diario> listarPorUsuario(UUID usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }
}