package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Alergeno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AlergenoDao extends JpaRepository<Alergeno, Long> {

    @Modifying
    @Query(value = "DELETE FROM plato_alergeno WHERE alergeno_id = :alergenoId", nativeQuery = true)
    void deleteAsociacionesConPlatos(@Param("alergenoId") Long alergenoId);
}
