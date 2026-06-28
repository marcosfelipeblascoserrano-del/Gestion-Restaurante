package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

@Repository
public interface PlatoDao extends JpaRepository<Plato, Long> {

    @EntityGraph(attributePaths = { "categoria", "alergenos", "ingredientes" })
    List<Plato> findAll();
}
