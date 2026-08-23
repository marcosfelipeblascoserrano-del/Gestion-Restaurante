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

    @org.springframework.beans.factory.annotation.Value("${app.precio-medio-comensal:25}")
    private long precioMedioComensal;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        LocalDateTime inicioHoy = LocalDate.now().atStartOfDay();
        LocalDateTime finHoy = LocalDate.now().atTime(23, 59, 59);
        long reservasHoy = reservaDao.countByFechaHoraBetween(inicioHoy, finHoy);

        YearMonth mesActual = YearMonth.now();
        LocalDateTime inicioMes = mesActual.atDay(1).atStartOfDay();
        LocalDateTime finMes = mesActual.atEndOfMonth().atTime(23, 59, 59);
        long reservasMes = reservaDao.countByFechaHoraBetween(inicioMes, finMes);

        long reservasPendientes = reservaDao.countByEstado(EstadoReserva.PENDIENTE);

        Long totalComensalesValidos = reservaDao.sumComensalesByEstados(
            java.util.Arrays.asList(EstadoReserva.COMPLETADA, EstadoReserva.CONFIRMADA)
        );
        long comensales = totalComensalesValidos != null ? totalComensalesValidos : 0L;
        long ingresosEstimados = comensales * precioMedioComensal;

        // Datos para gráfico semanal (ultimos 7 dias)
        Map<String, Long> reservasPorDia = new HashMap<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate dia = LocalDate.now().minusDays(i);
            long count = reservaDao.countByFechaHoraBetween(dia.atStartOfDay(), dia.atTime(23, 59, 59));
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
