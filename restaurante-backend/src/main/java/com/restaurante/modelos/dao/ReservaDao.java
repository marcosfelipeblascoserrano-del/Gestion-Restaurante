package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ReservaDao extends JpaRepository<Reserva, Long> {

    @Query("SELECT COUNT(r) FROM Reserva r WHERE r.fechaHora = :fechaHora AND r.estado IN ('PENDIENTE', 'CONFIRMADA')")
    long contarReservasActivasEnSlot(@Param("fechaHora") LocalDateTime fechaHora);
}
