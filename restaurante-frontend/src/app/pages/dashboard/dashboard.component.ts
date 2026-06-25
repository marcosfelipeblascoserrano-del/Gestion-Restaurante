import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

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
