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
    lastSubmittedEmail: string = '';

    // --- Calendario ---
    currentMonthDate: Date = new Date();
    calendarWeeks: { date: Date | null, disabled: boolean }[][] = [];


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

        this.generateCalendar();
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
        this.lastSubmittedEmail = this.reserva.email;

        this.reservaService.crearReserva(this.reserva).subscribe({
            next: () => {
                this.reservaExitosa = true;
                this.reserva = { nombre: '', email: '', telefono: '', fecha: '', slot: '', comensales: 2 };
                this.slotsDisponibles = [];
                setTimeout(() => this.reservaExitosa = false, 8000);
            },
            error: (err) => {
                this.errorReserva = err.error?.error || 'Ocurrió un error al procesar tu reserva.';
                setTimeout(() => this.errorReserva = '', 5000);
            }
        });
    }

    get slotsComida(): SlotDisponibilidad[] {
        return this.slotsDisponibles.filter(s => {
            const hour = parseInt(s.slot.split(':')[0], 10);
            return hour < 18; // Hasta las 18:00 se considera comida
        });
    }

    get slotsCena(): SlotDisponibilidad[] {
        return this.slotsDisponibles.filter(s => {
            const hour = parseInt(s.slot.split(':')[0], 10);
            return hour >= 18; // Desde las 18:00 se considera cena
        });
    }

    generateCalendar(): void {
        const year = this.currentMonthDate.getFullYear();
        const month = this.currentMonthDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        this.calendarWeeks = [];
        let currentWeek: { date: Date | null, disabled: boolean }[] = [];

        let startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

        for (let i = 0; i < startingDayOfWeek; i++) {
            currentWeek.push({ date: null, disabled: true });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const disabled = date < today || date.getDay() === 1;
            currentWeek.push({ date, disabled });

            if (currentWeek.length === 7) {
                this.calendarWeeks.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push({ date: null, disabled: true });
            }
            this.calendarWeeks.push(currentWeek);
        }
    }

    changeMonth(offset: number): void {
        this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + offset);
        this.generateCalendar();
    }

    selectDate(dateObj: Date): void {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        this.reserva.fecha = `${year}-${month}-${day}`;
        this.onFechaChange();
    }
}
