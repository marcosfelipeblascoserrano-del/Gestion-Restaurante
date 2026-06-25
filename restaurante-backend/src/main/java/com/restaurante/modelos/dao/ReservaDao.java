package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaDao extends JpaRepository<Reserva, Long> {
}
