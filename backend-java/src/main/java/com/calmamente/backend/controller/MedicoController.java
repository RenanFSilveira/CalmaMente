package com.calmamente.backend.controller;

import com.calmamente.backend.dto.CadastroMedicoDTO;
import com.calmamente.backend.model.Medico;
import com.calmamente.backend.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoService service;

    @PostMapping("/completar-cadastro")
    public ResponseEntity<Medico> completarCadastro(@RequestBody CadastroMedicoDTO dto) {
        System.out.println("--- RECEBENDO POST /medicos/completar-cadastro ---");
        System.out.println("Payload recebido: " + dto);

        Medico novoMedico = service.cadastrarMedico(dto);
        return ResponseEntity.ok(novoMedico);
    }
}