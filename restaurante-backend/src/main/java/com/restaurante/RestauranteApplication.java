package com.restaurante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.restaurante.modelos.dao.UsuarioDao;
import com.restaurante.modelos.dao.RestauranteDao;
import com.restaurante.modelos.entidades.Usuario;
import com.restaurante.modelos.entidades.Restaurante;
import com.restaurante.modelos.entidades.Rol;

import java.util.Optional;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RestauranteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestauranteApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UsuarioDao usuarioDao, RestauranteDao restauranteDao, PasswordEncoder passwordEncoder) {
		return args -> {
			String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@restaurante.com");
			Optional<Usuario> adminOpt = usuarioDao.findByEmail(adminEmail);
			if (adminOpt.isEmpty()) {
				Usuario admin = new Usuario();
				admin.setNombre("Administrador");
				admin.setEmail(adminEmail);
				String adminPass = System.getenv().getOrDefault("ADMIN_PASSWORD", "admin123");
				admin.setPassword(passwordEncoder.encode(adminPass));
				admin.setRol(Rol.ADMIN);
				usuarioDao.save(admin);

				Restaurante restaurante = new Restaurante();
				restaurante.setNombre("Mi Restaurante");
				restaurante.setUsuario(admin);
				restauranteDao.save(restaurante);
			}
		};
	}
}
