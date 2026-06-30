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
}
