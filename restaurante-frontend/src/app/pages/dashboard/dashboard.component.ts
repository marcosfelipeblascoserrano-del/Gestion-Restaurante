import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    bgImages: string[] = [
        '/assets/images/fondos/fondo-dashboard.jpg',
        '/assets/images/fondos/fondo-dashboard2.jpg',
        '/assets/images/fondos/fondo-dashboard3.jpg'
    ];
    currentIndex: number = 0;
    private intervalId: any;

    ngOnInit(): void {
        this.intervalId = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.bgImages.length;
        }, 2000);
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

    featuredDishes = [
        { name: 'Risotto de Boletus', category: 'Primeros', description: 'Arroz cremoso con boletus edulis, parmesano y aceite de trufa.', price: '14,90 €', icon: 'bi-egg-fried' },
        { name: 'Entrecot de Ternera', category: 'Principales', description: 'Entrecot a la parrilla con guarnición de patatas y chimichurri casero.', price: '22,50 €', icon: 'bi-fire' },
        { name: 'Tarta de Queso', category: 'Postres', description: 'Nuestra famosa tarta de queso vasca, cremosa y con coulomb de frutos rojos.', price: '7,90 €', icon: 'bi-cake2' },
    ];

    testimonials = [
        { name: 'María G.', rating: 5, text: 'Una experiencia gastronómica increíble. El ambiente es perfecto y la comida, simplemente exquisita.' },
        { name: 'Carlos P.', rating: 5, text: 'El mejor risotto que he probado en años. El servicio es atento y muy profesional. ¡Volveremos sin duda!' },
        { name: 'Laura M.', rating: 4, text: 'Lugar acogedor con una carta muy variada. Los postres son espectaculares. Muy recomendable.' },
    ];

    getStars(rating: number): number[] {
        return Array(rating).fill(0);
    }
}
