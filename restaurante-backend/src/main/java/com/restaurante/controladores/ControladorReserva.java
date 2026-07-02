package com.restaurante.controladores;

import com.restaurante.modelos.dto.ReservaRequestDTO;
import com.restaurante.modelos.dto.SlotDisponibilidadDTO;
import com.restaurante.modelos.entidades.Reserva;
import com.restaurante.modelos.servicios.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reservas")
public class ControladorReserva {

    @Autowired
    private IReservaService reservaService;

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequestDTO dto) {
        try {
            Reserva nuevaReserva = reservaService.crearReserva(dto);
            return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/disponibilidad")
    public ResponseEntity<?> consultarDisponibilidad(@RequestParam String fecha) {
        try {
            LocalDate date = LocalDate.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE);
            List<SlotDisponibilidadDTO> disp = reservaService.consultarDisponibilidad(date);
            return new ResponseEntity<>(disp, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Reserva> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String estado = body.get("estado");
        Reserva actualizada = reservaService.actualizarEstado(id, estado);
        return new ResponseEntity<>(actualizada, HttpStatus.OK);
    }

    @GetMapping("/confirmar")
    public ResponseEntity<?> confirmarReserva(@RequestParam String token) {
        try {
            Reserva reserva = reservaService.confirmarReserva(token);
            return new ResponseEntity<>(reserva, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/detalles")
    public ResponseEntity<?> getReservaPorToken(@RequestParam String token) {
        try {
            Reserva reserva = reservaService.getReservaPorToken(token);
            return new ResponseEntity<>(reserva, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
