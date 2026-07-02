package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.ReservaDao;
import com.restaurante.modelos.dto.ReservaRequestDTO;
import com.restaurante.modelos.dto.SlotDisponibilidadDTO;
import com.restaurante.modelos.entidades.EstadoReserva;
import com.restaurante.modelos.entidades.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaServiceImpl implements IReservaService {

    @Autowired
    private ReservaDao reservaDao;

    private static final int TOTAL_MESAS = 15;

    private static final List<String> SLOTS_COMIDA = List.of(
            "13:00", "13:30", "14:00", "14:30", "15:00", "15:30");
    private static final List<String> SLOTS_CENA = List.of(
            "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30");

    @Override
    @Transactional
    public Reserva crearReserva(ReservaRequestDTO dto) {
        if (dto.getFecha() == null || dto.getSlot() == null) {
            throw new IllegalArgumentException("Fecha y hora (slot) son obligatorios");
        }

        if (dto.getFecha().getDayOfWeek() == DayOfWeek.MONDAY) {
            throw new IllegalArgumentException("El restaurante cierra los lunes");
        }

        boolean esComida = SLOTS_COMIDA.contains(dto.getSlot());
        boolean esCena = SLOTS_CENA.contains(dto.getSlot());
        if (!esComida && !esCena) {
            throw new IllegalArgumentException("Slot de hora no válido");
        }

        LocalTime hora = LocalTime.parse(dto.getSlot(), DateTimeFormatter.ofPattern("HH:mm"));
        LocalDateTime fechaHora = LocalDateTime.of(dto.getFecha(), hora);

        long reservasActivas = reservaDao.contarReservasActivasEnSlot(fechaHora);
        if (reservasActivas >= TOTAL_MESAS) {
            throw new IllegalStateException("No hay mesas disponibles para este slot");
        }

        Reserva reserva = new Reserva();
        reserva.setNombre(dto.getNombre());
        reserva.setEmail(dto.getEmail());
        reserva.setTelefono(dto.getTelefono());
        reserva.setFechaHora(fechaHora);
        reserva.setComensales(dto.getComensales());
        reserva.setEstado(EstadoReserva.PENDIENTE);

        return reservaDao.save(reserva);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SlotDisponibilidadDTO> consultarDisponibilidad(LocalDate fecha) {
        List<SlotDisponibilidadDTO> disponibilidad = new ArrayList<>();

        if (fecha.getDayOfWeek() == DayOfWeek.MONDAY) {
            return disponibilidad;
        }

        List<String> todosLosSlots = new ArrayList<>();
        todosLosSlots.addAll(SLOTS_COMIDA);
        todosLosSlots.addAll(SLOTS_CENA);

        for (String slot : todosLosSlots) {
            LocalTime hora = LocalTime.parse(slot, DateTimeFormatter.ofPattern("HH:mm"));
            LocalDateTime fechaHora = LocalDateTime.of(fecha, hora);
            long activas = reservaDao.contarReservasActivasEnSlot(fechaHora);
            long libres = TOTAL_MESAS - activas;
            if (libres > 0) {
                disponibilidad.add(new SlotDisponibilidadDTO(slot, libres));
            }
        }

        return disponibilidad;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reserva> listarTodas() {
        return reservaDao.findAll();
    }

    @Override
    @Transactional
    public Reserva actualizarEstado(Long id, String estadoStr) {
        Reserva reserva = reservaDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));
        reserva.setEstado(EstadoReserva.valueOf(estadoStr.toUpperCase()));
        return reservaDao.save(reserva);
    }
}
