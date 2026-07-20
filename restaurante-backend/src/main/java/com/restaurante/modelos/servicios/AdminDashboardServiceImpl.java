package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.ReservaDao;
import com.restaurante.modelos.entidades.EstadoReserva;
import com.restaurante.modelos.entidades.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminDashboardServiceImpl implements IAdminDashboardService {

    @Autowired
    private ReservaDao reservaDao;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        List<Reserva> todas = reservaDao.findAll();

        LocalDateTime inicioHoy = LocalDate.now().atStartOfDay();
        LocalDateTime finHoy = LocalDate.now().atTime(23, 59, 59);

        long reservasHoy = todas.stream()
                .filter(r -> r.getFechaHora() != null &&
                        r.getFechaHora().isAfter(inicioHoy) &&
                        r.getFechaHora().isBefore(finHoy))
                .count();

        YearMonth mesActual = YearMonth.now();
        long reservasMes = todas.stream()
                .filter(r -> r.getFechaHora() != null &&
                        YearMonth.from(r.getFechaHora()).equals(mesActual))
                .count();

        long reservasPendientes = todas.stream()
                .filter(r -> r.getEstado() == EstadoReserva.PENDIENTE)
                .count();

        long ingresosEstimados = todas.stream()
                .filter(r -> r.getEstado() == EstadoReserva.COMPLETADA || r.getEstado() == EstadoReserva.CONFIRMADA)
                .mapToLong(r -> (r.getComensales() != null ? r.getComensales() : 1) * 25L) // Estimado: 25 por persona
                .sum();

        // Datos para gráfico semanal (ultimos 7 dias)
        Map<String, Long> reservasPorDia = new HashMap<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate dia = LocalDate.now().minusDays(i);
            long count = todas.stream()
                    .filter(r -> r.getFechaHora() != null && r.getFechaHora().toLocalDate().equals(dia))
                    .count();
            reservasPorDia.put(dia.toString(), count);
        }

        stats.put("reservasHoy", reservasHoy);
        stats.put("reservasMes", reservasMes);
        stats.put("reservasPendientes", reservasPendientes);
        stats.put("ingresosEstimados", ingresosEstimados);
        stats.put("graficoSemanal", reservasPorDia);

        return stats;
    }
}
