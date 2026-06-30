import { Component, OnInit } from '@angular/core';
import { ReservaRequest, SlotDisponibilidad } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    featuredDishes = [
        { name: 'Risotto de Boletus', category: 'Primeros', description: 'Arroz cremoso con boletus edulis, parmesano y aceite de trufa.', price: '14,90 €', icon: 'bi-egg-fried' },
        { name: 'Entrecot de Ternera', category: 'Principales', description: 'Entrecot a la parrilla con guarnición de patatas y chimichurri casero.', price: '22,50 €', icon: 'bi-fire' },
        { name: 'Tarta de Queso', category: 'Postres', description: 'Nuestra famosa tarta de queso vasca, cremosa y con coulomb de frutos rojos.', price: '7,90 €', icon: 'bi-cake2' },
    ];

    reserva: ReservaRequest = {
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        slot: '',
        comensales: 2
    };

    slotsDisponibles: SlotDisponibilidad[] = [];
    minDate: string = '';
    reservaExitosa: boolean = false;
    errorReserva: string = '';

    constructor(private reservaService: ReservaService) { }

    ngOnInit(): void {
        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];
    }

    onFechaChange(): void {
        this.slotsDisponibles = [];
        this.reserva.slot = '';
        this.errorReserva = '';

        if (!this.reserva.fecha) return;

        const dateObj = new Date(this.reserva.fecha);
        if (dateObj.getDay() === 1) { // 0=Sun, 1=Mon
            this.errorReserva = 'Los lunes estamos cerrados. Por favor, elige otro día.';
            return;
        }

        this.reservaService.getDisponibilidad(this.reserva.fecha).subscribe({
            next: (slots) => {
                this.slotsDisponibles = slots;
                if (slots.length === 0) {
                    this.errorReserva = 'No hay mesas disponibles para este día.';
                }
            },
            error: (err) => {
                this.errorReserva = 'Error al consultar disponibilidad.';
                console.error(err);
            }
        });
    }

    enviarReserva(): void {
        this.errorReserva = '';
        this.reservaExitosa = false;

        this.reservaService.crearReserva(this.reserva).subscribe({
            next: (res) => {
                this.reservaExitosa = true;
                // reset form
                this.reserva = { nombre: '', email: '', telefono: '', fecha: '', slot: '', comensales: 2 };
                this.slotsDisponibles = [];
                setTimeout(() => this.reservaExitosa = false, 5000);
            },
            error: (err) => {
                this.errorReserva = err.error?.error || 'Ocurrió un error al procesar tu reserva.';
                setTimeout(() => this.errorReserva = '', 5000);
            }
        });
    }
}
