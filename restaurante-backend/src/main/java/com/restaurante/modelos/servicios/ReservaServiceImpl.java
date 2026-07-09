package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.ReservaDao;
import com.restaurante.modelos.dto.ReservaRequestDTO;
import com.restaurante.modelos.dto.SlotDisponibilidadDTO;
import com.restaurante.modelos.entidades.EstadoReserva;
import com.restaurante.modelos.entidades.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ReservaServiceImpl implements IReservaService {

    private static final Logger logger = LoggerFactory.getLogger(ReservaServiceImpl.class);

    @Autowired
    private ReservaDao reservaDao;

    @Autowired
    private EmailService emailService;

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

        long reservasEnTurno = 0;
        List<EstadoReserva> estados = List.of(EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA);

        if (esComida) {
            LocalDateTime start = LocalDateTime.of(dto.getFecha(), LocalTime.parse("13:00"));
            LocalDateTime end = LocalDateTime.of(dto.getFecha(), LocalTime.parse("15:30"));
            reservasEnTurno = reservaDao.contarReservasActivasEnTurno(start, end, estados);
        } else {
            LocalDateTime start = LocalDateTime.of(dto.getFecha(), LocalTime.parse("20:00"));
            LocalDateTime end = LocalDateTime.of(dto.getFecha(), LocalTime.parse("23:30"));
            reservasEnTurno = reservaDao.contarReservasActivasEnTurno(start, end, estados);
        }

        if (reservasEnTurno >= TOTAL_MESAS) {
            throw new IllegalStateException("No hay mesas disponibles para este turno");
        }

        Reserva reserva = new Reserva();
        reserva.setNombre(dto.getNombre());
        reserva.setEmail(dto.getEmail());
        reserva.setTelefono(dto.getTelefono());
        reserva.setFechaHora(fechaHora);
        reserva.setComensales(dto.getComensales());
        reserva.setEstado(EstadoReserva.PENDIENTE);
        reserva.setTokenConfirmacion(UUID.randomUUID().toString());

        reserva = reservaDao.save(reserva);

        emailService.enviarEmailConfirmacion(reserva);

        return reserva;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SlotDisponibilidadDTO> consultarDisponibilidad(LocalDate fecha) {
        List<SlotDisponibilidadDTO> disponibilidad = new ArrayList<>();

        if (fecha.getDayOfWeek() == DayOfWeek.MONDAY) {
            return disponibilidad;
        }

        List<EstadoReserva> estados = List.of(EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA);

        LocalDateTime startComida = LocalDateTime.of(fecha, LocalTime.parse("13:00"));
        LocalDateTime endComida = LocalDateTime.of(fecha, LocalTime.parse("15:30"));
        long activasComida = reservaDao.contarReservasActivasEnTurno(startComida, endComida, estados);
        long libresComida = TOTAL_MESAS - activasComida;

        if (libresComida > 0) {
            for (String slot : SLOTS_COMIDA) {
                disponibilidad.add(new SlotDisponibilidadDTO(slot, libresComida));
            }
        }

        LocalDateTime startCena = LocalDateTime.of(fecha, LocalTime.parse("20:00"));
        LocalDateTime endCena = LocalDateTime.of(fecha, LocalTime.parse("23:30"));
        long activasCena = reservaDao.contarReservasActivasEnTurno(startCena, endCena, estados);
        long libresCena = TOTAL_MESAS - activasCena;

        if (libresCena > 0) {
            for (String slot : SLOTS_CENA) {
                disponibilidad.add(new SlotDisponibilidadDTO(slot, libresCena));
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

    @Override
    @Transactional
    public Reserva confirmarReserva(String token) {
        Reserva reserva = reservaDao.findByTokenConfirmacion(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido o reserva no existe"));
        if (reserva.getEstado() == EstadoReserva.PENDIENTE) {
            reserva.setEstado(EstadoReserva.CONFIRMADA);
            return reservaDao.save(reserva);
        } else {
            throw new IllegalStateException("La reserva ya fue confirmada o cancelada");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Reserva getReservaPorToken(String token) {
        return reservaDao.findByTokenConfirmacion(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido o reserva no existe"));
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void limpiarReservasCaducadas() {
        LocalDateTime limite = LocalDateTime.now().minusMinutes(15);
        List<Reserva> caducadas = reservaDao.findByEstadoAndFechaCreacionBefore(EstadoReserva.PENDIENTE, limite);
        
        if (!caducadas.isEmpty()) {
            logger.info("Cancelando {} reservas pendientes que han superado los 15 minutos", caducadas.size());
            for (Reserva r : caducadas) {
                r.setEstado(EstadoReserva.CANCELADA);
                reservaDao.save(r);
            }
        }
    }
}
