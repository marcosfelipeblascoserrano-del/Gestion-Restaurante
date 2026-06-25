package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Alergeno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlergenoDao extends JpaRepository<Alergeno, Long> {
}
