import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  loading = true;
  filtroEstado = 'TODAS';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.loading = true;
    this.reservaService.listarTodas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando reservas', err);
        this.loading = false;
      }
    });
  }

  get reservasFiltradas() {
    if (this.filtroEstado === 'TODAS') return this.reservas;
    return this.reservas.filter(r => r.estado === this.filtroEstado);
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.reservaService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => this.cargarReservas(),
      error: (err) => console.error('Error actualizando estado', err)
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'status-pending';
      case 'CONFIRMADA': return 'status-confirmed';
      case 'COMPLETADA': return 'status-completed';
      case 'CANCELADA': return 'status-cancelled';
      default: return '';
    }
  }
}
