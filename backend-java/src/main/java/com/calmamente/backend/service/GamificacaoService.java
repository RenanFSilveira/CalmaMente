package com.calmamente.backend.service;

import com.calmamente.backend.model.Meta;
import com.calmamente.backend.model.Pontuacao;
import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.repository.MetaRepository;
import com.calmamente.backend.repository.PontuacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GamificacaoService {

    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    private PontuacaoRepository pontuacaoRepository;
    
    public Meta criarMeta(Meta meta) {        
        if (meta.getDificuldade() < 1 || meta.getDificuldade() > 3) {
            throw new IllegalArgumentException("Dificuldade deve ser 1, 2 ou 3");
        }
        return metaRepository.save(meta);
    }
    
    public List<Meta> listarMetas(UUID usuarioId) {
        return metaRepository.findByUsuarioId(usuarioId);
    }

    
    public Pontuacao obterPontuacao(Usuario usuario) {
        return pontuacaoRepository.findByUsuarioId(usuario.getId())
                .orElseGet(() -> {
                    Pontuacao nova = new Pontuacao();
                    nova.setUsuario(usuario);
                    return pontuacaoRepository.save(nova);
                });
    }
    
    public Pontuacao concluirMeta(UUID metaId) {
        Meta meta = metaRepository.findById(metaId)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada"));
        
        Pontuacao pontuacao = obterPontuacao(meta.getUsuario());
        
        pontuacao.setPontosTotais(pontuacao.getPontosTotais() + meta.getDificuldade());
        
        int novoNivel = (pontuacao.getPontosTotais() / 10) + 1;
        pontuacao.setNivelAtual(novoNivel);

        return pontuacaoRepository.save(pontuacao);
    }
}