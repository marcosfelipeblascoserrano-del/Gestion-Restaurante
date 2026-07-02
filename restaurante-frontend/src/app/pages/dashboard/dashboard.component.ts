import { Component, OnInit } from '@angular/core';
import { Plato } from '../../models/plato';
import { PlatoService } from '../../services/plato.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private readonly FEATURED_NAMES = [
        'Patatas bravas',
        'Espaguetis carbonara',
        'Entrecot a la parrilla'
    ];

    featuredDishes: Plato[] = [];

    constructor(private platoService: PlatoService) { }

    ngOnInit(): void {
        this.platoService.getAllPlatos().subscribe(platos => {
            this.featuredDishes = platos.filter(p =>
                this.FEATURED_NAMES.some(name => p.nombre.toLowerCase() === name.toLowerCase())
            );
        });
    }
}
