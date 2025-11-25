package com.calmamente.backend.service;

import com.calmamente.backend.model.Notificacao;
import com.calmamente.backend.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository repository;

    public Notificacao criarNotificacao(Notificacao notificacao) {
        return repository.save(notificacao);
    }

    public List<Notificacao> listarPorUsuario(UUID usuarioId) {
        return repository.findByUsuarioIdOrderByDataEnvioDesc(usuarioId);
    }
    
    public long contarNaoLidas(UUID usuarioId) {
        return repository.countByUsuarioIdAndLidaFalse(usuarioId);
    }

    public Notificacao marcarComoLida(UUID id) {
        Notificacao notif = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notificação não encontrada"));
        notif.setLida(true);
        return repository.save(notif);
    }
}