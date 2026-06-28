package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredienteDao extends JpaRepository<Ingrediente, Long> {
    List<Ingrediente> findByPlatoId(Long platoId);
}
