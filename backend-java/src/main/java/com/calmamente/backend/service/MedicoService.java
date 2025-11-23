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

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional // Garante que salva tudo ou nada
    public Medico cadastrarMedico(CadastroMedicoDTO dados) {
        // 1. Busca o Usuário que o Trigger criou (ou que veio do Front)
        Usuario usuario = usuarioRepository.findById(dados.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário base não encontrado. Crie o Auth primeiro."));

        // 2. Atualiza os dados comuns na tabela Usuario
        usuario.setNome(dados.getNome());
        usuario.setTelefone(dados.getTelefone());
        usuario.setTipo(TipoUsuario.profissional); // Força o tipo
        usuarioRepository.save(usuario);

        // 3. Cria a entrada na tabela Medico vinculada
        Medico medico = new Medico();
        medico.setUsuario(usuario); // O @MapsId vai cuidar de copiar o ID
        medico.setCrm(dados.getCrm());
        medico.setCnpj(dados.getCnpj());
        medico.setEspecialidade(dados.getEspecialidade());

        return medicoRepository.save(medico);
    }
}