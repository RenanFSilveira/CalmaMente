package com.calmamente.backend.repository;

import com.calmamente.backend.model.Conteudo;
import com.calmamente.backend.model.TipoConteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, UUID> {
    // Para filtrar na tela de biblioteca (ex: trazer só vídeos)
    List<Conteudo> findByTipo(TipoConteudo tipo);
    
    // Para filtrar por categoria (ex: trazer tudo sobre "Sono")
    List<Conteudo> findByCategoria(String categoria);

    List<Conteudo> findByTituloContainingIgnoreCase(String titulo);
}