package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestauranteDao extends JpaRepository<Restaurante, Long> {
    Optional<Restaurante> findByUsuarioId(Long usuarioId);
}
