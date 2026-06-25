package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatoDao extends JpaRepository<Plato, Long> {
}
