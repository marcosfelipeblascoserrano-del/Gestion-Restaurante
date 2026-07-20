import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
    selector: 'app-carta',
    templateUrl: './carta.component.html',
    styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

    constructor(
        private categoriaService: CategoriaService,
        private platoService: PlatoService,
        private seoService: SeoService
    ) { }

    categoriasConPlatos: any[] = [];
    platoSeleccionado: Plato | null = null;

    ngOnInit(): void {
        this.seoService.updateTitle('Nuestra Carta - La Belle Époque');
        this.seoService.updateMeta(
            'Descubre nuestra selección de platos únicos y de autor. Carnes, pescados, arroces y postres artesanales en pleno Madrid.',
            'Nuestra Carta - La Belle Époque',
            'https://www.labelleepoque.es/logo.jpg'
        );
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
                            const catName = p.categoria 
                                ? (typeof p.categoria === 'object' ? (p.categoria as any).nombre : p.categoria)
                                : null;
                            return catName === categoria.nombre;
                        })
                };
            });

            const menuStructuredData = {
                "@context": "https://schema.org",
                "@type": "Menu",
                "name": "Carta principal La Belle Époque",
                "hasMenuSection": this.categoriasConPlatos.map(c => ({
                    "@type": "MenuSection",
                    "name": c.nombre,
                    "description": c.descripcion || "",
                    "hasMenuItem": c.platos.map((p: any) => ({
                        "@type": "MenuItem",
                        "name": p.nombre,
                        "description": p.descripcion || "",
                        "offers": {
                            "@type": "Offer",
                            "price": p.precio,
                            "priceCurrency": "EUR"
                        }
                    }))
                }))
            };
            this.seoService.setStructuredData(menuStructuredData);
        });
    }

}
