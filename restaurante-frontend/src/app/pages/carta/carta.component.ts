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
    platoSeleccionado: Plato | null = null;

    ngOnInit(): void {
        this.cargarDatos();
    }

    seleccionarPlato(plato: Plato): void {
        this.platoSeleccionado = plato;
    }

    scrollLeft(element: HTMLElement): void {
        element.scrollBy({ left: -400, behavior: 'smooth' });
    }

    scrollRight(element: HTMLElement): void {
        element.scrollBy({ left: 400, behavior: 'smooth' });
    }

    cargarDatos(): void {
        forkJoin({
            categorias: this.categoriaService.getAllCategorias(),
            platos: this.platoService.getAllPlatos()
        }).subscribe(({ categorias, platos }) => {
            this.categoriasConPlatos = categorias.map(categoria => {
                return {
                    ...categoria,
                    platos: platos
                        .filter(p => {
                            const catName = typeof p.categoria === 'object'
                                ? (p.categoria as any).nombre
                                : p.categoria;
                            return catName === categoria.nombre;
                        })
                };
            });
        });
    }

}
