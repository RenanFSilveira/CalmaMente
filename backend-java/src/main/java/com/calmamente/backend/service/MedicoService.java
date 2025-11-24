package com.calmamente.backend.service;

import com.calmamente.backend.dto.CadastroMedicoDTO;
import com.calmamente.backend.model.Medico;
import com.calmamente.backend.model.TipoUsuario;
import com.calmamente.backend.model.Usuario;
import com.calmamente.backend.repository.MedicoRepository;
import com.calmamente.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional 
    public Medico cadastrarMedico(CadastroMedicoDTO dados) {
        // 1. Busca o Usuário com Retry
        Usuario usuario = buscarUsuarioComRetry(dados.getUsuarioId());

        // 2. Atualiza os dados na tabela Usuario
        usuario.setNome(dados.getNome());
        usuario.setTelefone(dados.getTelefone());
        
        // --- NOVOS CAMPOS SENDO SALVOS ---
        if (dados.getCpf() != null) usuario.setCpf(dados.getCpf());
        if (dados.getGenero() != null) usuario.setGenero(dados.getGenero());
        if (dados.getDataNascimento() != null) usuario.setDataNascimento(dados.getDataNascimento());
        // ---------------------------------

        usuario.setTipo(TipoUsuario.profissional); 
        usuarioRepository.save(usuario);

        // 3. Cria a entrada na tabela Medico
        Medico medico = new Medico();
        medico.setUsuario(usuario);
        
        // Garante o ID igual (Correção importante)
        medico.setId(usuario.getId()); 

        medico.setCrm(dados.getCrm());
        medico.setCnpj(dados.getCnpj());
        medico.setEspecialidade(dados.getEspecialidade());

        return medicoRepository.save(medico);
    }

    private Usuario buscarUsuarioComRetry(UUID id) {
        int tentativas = 0;
        int maxTentativas = 5;
        long tempoEspera = 1000; 

        while (tentativas < maxTentativas) {
            java.util.Optional<Usuario> usuario = usuarioRepository.findById(id);
            if (usuario.isPresent()) {
                return usuario.get();
            }

            try {
                System.out.println("Usuário (Médico) " + id + " não encontrado. Tentativa " + (tentativas + 1) + "/" + maxTentativas + ". Aguardando...");
                Thread.sleep(tempoEspera);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Erro ao aguardar criação do usuário.", e);
            }
            tentativas++;
        }

        throw new RuntimeException("Usuário base não encontrado após " + maxTentativas + " tentativas. Crie o Auth primeiro.");
    }

    public java.util.List<Medico> buscarMedicos(String nome, String especialidade) {
        if (nome != null && !nome.isBlank() && especialidade != null && !especialidade.isBlank()) {
            return medicoRepository.findByUsuario_NomeContainingIgnoreCaseAndEspecialidadeContainingIgnoreCase(nome, especialidade);
        }
        if (nome != null && !nome.isBlank()) {
            return medicoRepository.findByUsuario_NomeContainingIgnoreCase(nome);
        }
        if (especialidade != null && !especialidade.isBlank()) {
            return medicoRepository.findByEspecialidadeContainingIgnoreCase(especialidade);
        }
        return medicoRepository.findAll();
    }
}