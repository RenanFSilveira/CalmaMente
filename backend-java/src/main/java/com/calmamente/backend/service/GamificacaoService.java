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

    // 1. Criar uma nova meta
    public Meta criarMeta(Meta meta) {
        // Validação simples de dificuldade
        if (meta.getDificuldade() < 1 || meta.getDificuldade() > 3) {
            throw new IllegalArgumentException("Dificuldade deve ser 1, 2 ou 3");
        }
        return metaRepository.save(meta);
    }

    // 2. Listar metas do usuário
    public List<Meta> listarMetas(UUID usuarioId) {
        return metaRepository.findByUsuarioId(usuarioId);
    }

    // 3. Obter (ou inicializar) pontuação do usuário
    public Pontuacao obterPontuacao(Usuario usuario) {
        return pontuacaoRepository.findByUsuarioId(usuario.getId())
                .orElseGet(() -> {
                    Pontuacao nova = new Pontuacao();
                    nova.setUsuario(usuario);
                    return pontuacaoRepository.save(nova);
                });
    }

    // 4. A MÁGICA: Concluir meta e ganhar pontos
    public Pontuacao concluirMeta(UUID metaId) {
        Meta meta = metaRepository.findById(metaId)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada"));

        // Pega a pontuação atual do dono da meta
        Pontuacao pontuacao = obterPontuacao(meta.getUsuario());

        // Adiciona os pontos baseados na dificuldade (1, 2 ou 3)
        pontuacao.setPontosTotais(pontuacao.getPontosTotais() + meta.getDificuldade());

        // Lógica simples de Level Up (a cada 10 pontos sobe de nível)
        int novoNivel = (pontuacao.getPontosTotais() / 10) + 1;
        pontuacao.setNivelAtual(novoNivel);

        return pontuacaoRepository.save(pontuacao);
    }
}