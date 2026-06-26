import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
    selector: 'app-carta',
    templateUrl: './carta.component.html',
    styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

    constructor(private categoriaService: CategoriaService, private platoService: PlatoService) { }

    categoriasConPlatos: any[] = [];

    ngOnInit(): void {
        this.cargarDatos();
    }

    scrollLeft(element: HTMLElement): void {
        element.scrollBy({ left: -400, behavior: 'smooth' });
    }

    scrollRight(element: HTMLElement): void {
        element.scrollBy({ left: 400, behavior: 'smooth' });
    }

    // Imagen representativa por categoría
    private readonly imagenPorCategoria: Record<string, string> = {
        'Entrantes': 'assets/fotosPlatos/ensalada.png',
        'Ensaladas': 'assets/fotosPlatos/ensalada.png',
        'Sopas y Cremas': 'assets/fotosPlatos/sopa.png',
        'Sopas': 'assets/fotosPlatos/sopa.png',
        'Pastas': 'assets/fotosPlatos/pasta.png',
        'Pizzas': 'assets/fotosPlatos/pizza.png',
        'Hamburguesas': 'assets/fotosPlatos/hamburguesa.png',
        'Hamburguerías': 'assets/fotosPlatos/hamburguesa.png',
        'Postres': 'assets/fotosPlatos/postre.png',
        'Bebidas': 'assets/fotosPlatos/postre.png',
    };

    cargarDatos(): void {
        forkJoin({
            categorias: this.categoriaService.getAllCategorias(),
            platos: this.platoService.getAllPlatos()
        }).subscribe(({ categorias, platos }) => {
            this.categoriasConPlatos = categorias.map(categoria => {
                const imgDefecto = this.imagenPorCategoria[categoria.nombre]
                    ?? 'assets/fotosPlatos/pizza.png';

                return {
                    ...categoria,
                    platos: platos
                        .filter(p => {
                            const catName = typeof p.categoria === 'object'
                                ? (p.categoria as any).nombre
                                : p.categoria;
                            return catName === categoria.nombre;
                        })
                        .map(p => ({
                            ...p,
                            // Siempre usamos la imagen de la categoría (imagenUrl del backend tiene rutas inválidas)
                            imagenUrl: imgDefecto
                        }))
                };
            });
        });
    }

}
