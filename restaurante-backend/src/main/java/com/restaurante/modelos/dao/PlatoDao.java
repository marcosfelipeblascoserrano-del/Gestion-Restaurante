package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

@Repository
public interface PlatoDao extends JpaRepository<Plato, Long> {

    @EntityGraph(attributePaths = { "categoria", "alergenos", "ingredientes" })
    List<Plato> findAll();

    @Modifying
    @Query(value = "DELETE FROM plato_alergeno WHERE plato_id = :id", nativeQuery = true)
    void eliminarAlergenosDePlato(@Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM ingredientes WHERE plato_id = :id", nativeQuery = true)
    void eliminarIngredientesDePlato(@Param("id") Long id);
}
