package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResenaDao extends JpaRepository<Resena, Long> {
}
