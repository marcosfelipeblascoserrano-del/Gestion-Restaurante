package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dto.ReservaRequestDTO;
import com.restaurante.modelos.dto.SlotDisponibilidadDTO;
import com.restaurante.modelos.entidades.Reserva;

import java.time.LocalDate;
import java.util.List;

public interface IReservaService {
    Reserva crearReserva(ReservaRequestDTO dto);

    List<SlotDisponibilidadDTO> consultarDisponibilidad(LocalDate fecha);

    List<Reserva> listarTodas();

    Reserva actualizarEstado(Long id, String estadoStr);
}
