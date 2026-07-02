import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.css']
})
export class ConfirmarReservaComponent implements OnInit {

  token: string = '';
  reserva: any = null;
  cargando: boolean = true;
  errorMensaje: string = '';
  confirmadaValidamente: boolean = false;
  estadoConfirmacion: 'pendiente' | 'cargando' | 'completada' | 'error' = 'pendiente';

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMensaje = 'No se proporcionó un token válido.';
        this.cargando = false;
        return;
      }

      this.cargarDetallesReserva();
    });
  }

  cargarDetallesReserva() {
    this.reservaService.getDetallesReserva(this.token).subscribe({
      next: (res) => {
        this.reserva = res;
        this.cargando = false;
        if (res.estado === 'CONFIRMADA') {
          this.estadoConfirmacion = 'completada';
          this.confirmadaValidamente = true;
        }
      },
      error: (err) => {
        this.errorMensaje = 'Error al recuperar los detalles de la reserva. Es posible que el enlace haya caducado.';
        this.cargando = false;
      }
    });
  }

  confirmar() {
    this.estadoConfirmacion = 'cargando';
    this.reservaService.confirmarReserva(this.token).subscribe({
      next: (res) => {
        this.reserva = res;
        this.estadoConfirmacion = 'completada';
        this.confirmadaValidamente = true;
      },
      error: (err) => {
        this.errorMensaje = err.error?.error || 'Error al confirmar la reserva.';
        this.estadoConfirmacion = 'error';
      }
    });
  }
}
