import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plato } from '../../models/plato';
import { PlatoService } from '../../services/plato.service';
import { ReservaRequest, SlotDisponibilidad } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    // --- Carrusel ---
    bgImages: string[] = [
        '/assets/images/fondos/fondo-dashboard.jpg',
        '/assets/images/fondos/fondo-dashboard2.jpg',
        '/assets/images/fondos/fondo-dashboard3.jpg'
    ];
    currentIndex: number = 0;
    private intervalId: any;

    // --- Platos destacados ---
    private readonly FEATURED_NAMES = [
        'Patatas bravas',
        'Espaguetis carbonara',
        'Entrecot a la parrilla'
    ];
    featuredDishes: Plato[] = [];

    // --- Reservas ---
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

    constructor(
        private platoService: PlatoService,
        private reservaService: ReservaService
    ) { }

    ngOnInit(): void {
        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];

        this.intervalId = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.bgImages.length;
        }, 2000);

        this.platoService.getAllPlatos().subscribe(platos => {
            this.featuredDishes = platos.filter(p =>
                this.FEATURED_NAMES.some(name => p.nombre.toLowerCase() === name.toLowerCase())
            );
        });
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    getSlideClass(index: number): string {
        if (index === this.currentIndex) {
            return 'active';
        } else if (index === (this.currentIndex - 1 + this.bgImages.length) % this.bgImages.length) {
            return 'prev';
        } else {
            return 'next';
        }
    }

    onFechaChange(): void {
        this.slotsDisponibles = [];
        this.reserva.slot = '';
        this.errorReserva = '';

        if (!this.reserva.fecha) return;

        const dateObj = new Date(this.reserva.fecha);
        if (dateObj.getDay() === 1) {
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
            next: () => {
                this.reservaExitosa = true;
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
