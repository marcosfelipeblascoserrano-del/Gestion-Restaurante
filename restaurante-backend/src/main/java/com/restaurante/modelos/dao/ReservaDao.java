package com.restaurante.modelos.dao;

import com.restaurante.modelos.entidades.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ReservaDao extends JpaRepository<Reserva, Long> {

    @Query("SELECT COUNT(r) FROM Reserva r WHERE r.fechaHora >= :start AND r.fechaHora <= :end AND r.estado IN :estados")
    long contarReservasActivasEnTurno(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end,
            @Param("estados") java.util.List<com.restaurante.modelos.entidades.EstadoReserva> estados);

    java.util.Optional<Reserva> findByTokenConfirmacion(String tokenConfirmacion);

    java.util.List<Reserva> findByEstadoAndFechaCreacionBefore(com.restaurante.modelos.entidades.EstadoReserva estado, LocalDateTime fechaCreacion);
}
