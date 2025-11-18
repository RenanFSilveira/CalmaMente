package com.calmamente.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class TesteConexao {

    @Bean
    public CommandLineRunner testar(DataSource dataSource) {
        return args -> {
            System.out.println("------------------------------------------------");
            System.out.println("🔄 TENTANDO CONECTAR AO SUPABASE...");
            
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅ SUCESSO! Conexão estabelecida.");
                System.out.println("📦 URL do Banco: " + connection.getMetaData().getURL());
            } catch (Exception e) {
                System.out.println("❌ ERRO AO CONECTAR:");
                e.printStackTrace();
            }
            
            System.out.println("------------------------------------------------");
        };
    }
}