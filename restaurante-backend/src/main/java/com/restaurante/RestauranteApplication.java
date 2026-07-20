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
			Optional<Usuario> adminOpt = usuarioDao.findByEmail("admin@restaurante.com");
			if (adminOpt.isEmpty()) {
				Usuario admin = new Usuario();
				admin.setNombre("Administrador");
				admin.setEmail("admin@restaurante.com");
				admin.setPassword(passwordEncoder.encode("admin123"));
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
