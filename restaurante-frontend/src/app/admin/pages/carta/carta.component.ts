import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PlatoService } from '../../../services/plato.service';
import { Plato } from '../../../models/plato';
import { CategoriaService } from '../../../categoria.service';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  platos: Plato[] = [];
  loading = true;

  // Modal plato
  showModal = false;
  editingPlato: any = null;

  // Listas de selección
  categorias: Categoria[] = [];
  alergenos: any[] = [];
  ingredientes: any[] = [];

  // Selección actual en el modal
  selectedAlergenosIds: Set<number> = new Set();
  selectedIngredientesIds: Set<number> = new Set();

  // Modales rápidos de creación
  showNuevoAlergenoModal = false;
  showNuevoIngredienteModal = false;
  nuevoAlergenoNombre = '';
  nuevoIngredienteNombre = '';

  savingItem = false;

  // Modo borrar alérgeno/ingrediente
  modoEliminarAlergeno = false;
  modoEliminarIngrediente = false;

  // Modal de confirmación de borrado
  showConfirmModal = false;
  confirmTipo: 'alergeno' | 'ingrediente' | null = null;
  confirmItem: any = null;

  constructor(
    private platoService: PlatoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    forkJoin({
      platos: this.platoService.getAllPlatos(),
      categorias: this.categoriaService.getAllCategorias(),
      alergenos: this.platoService.getAllAlergenos(),
      ingredientes: this.platoService.getAllIngredientes()
    }).subscribe({
      next: ({ platos, categorias, alergenos, ingredientes }) => {
        this.platos = platos;
        this.categorias = categorias;
        this.alergenos = alergenos;
        this.ingredientes = ingredientes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando datos de carta', err);
        this.loading = false;
      }
    });
  }

  abrirModal(plato?: Plato) {
    if (plato) {
      this.editingPlato = {
        ...plato,
        categoria: plato.categoria ? { id: (plato.categoria as any).id } : { id: null }
      };
      // Cargar los IDs seleccionados
      const alergenos = (plato as any).alergenos || [];
      this.selectedAlergenosIds = new Set(alergenos.map((a: any) => a.id));
      const ingredientesList = (plato as any).ingredientes || [];
      this.selectedIngredientesIds = new Set(ingredientesList.map((i: any) => i.id));
    } else {
      this.editingPlato = {
        nombre: '',
        descripcion: '',
        precio: null,
        disponible: true,
        imagenUrl: '',
        categoria: { id: null }
      };
      this.selectedAlergenosIds = new Set();
      this.selectedIngredientesIds = new Set();
    }
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.editingPlato = null;
  }

  toggleAlergeno(id: number) {
    if (this.selectedAlergenosIds.has(id)) {
      this.selectedAlergenosIds.delete(id);
    } else {
      this.selectedAlergenosIds.add(id);
    }
  }

  toggleIngrediente(id: number) {
    if (this.selectedIngredientesIds.has(id)) {
      this.selectedIngredientesIds.delete(id);
    } else {
      this.selectedIngredientesIds.add(id);
    }
  }

  guardarPlato() {
    const payload: any = {
      ...this.editingPlato,
      categoria: (this.editingPlato.categoria?.id)
        ? { id: this.editingPlato.categoria.id }
        : null,
      alergenos: Array.from(this.selectedAlergenosIds).map(id => ({ id })),
      ingredientes: Array.from(this.selectedIngredientesIds).map(id => ({ id }))
    };

    if (payload.id) {
      this.platoService.updatePlato(payload.id, payload).subscribe({
        next: () => { this.cargarDatos(); this.cerrarModal(); },
        error: (err) => console.error('Error actualizando plato', err)
      });
    } else {
      this.platoService.createPlato(payload).subscribe({
        next: () => { this.cargarDatos(); this.cerrarModal(); },
        error: (err) => console.error('Error creando plato', err)
      });
    }
  }

  eliminarPlato(id: number) {
    if (confirm('¿Estás seguro de eliminar este plato?')) {
      this.platoService.deletePlato(id).subscribe({
        next: () => this.cargarDatos(),
        error: (err) => console.error('Error eliminando plato', err)
      });
    }
  }

  toggleDisponibilidad(plato: any) {
    const updated = { ...plato, disponible: !plato.disponible,
      categoria: plato.categoria ? { id: plato.categoria.id } : null,
      alergenos: (plato.alergenos || []).map((a: any) => ({ id: a.id })),
      ingredientes: (plato.ingredientes || []).map((i: any) => ({ id: i.id }))
    };
    this.platoService.updatePlato(plato.id, updated).subscribe({
      next: () => { plato.disponible = !plato.disponible; }
    });
  }

  // --- Nuevo Alergeno ---
  guardarAlergeno() {
    if (!this.nuevoAlergenoNombre.trim()) return;
    this.savingItem = true;
    this.platoService.createAlergeno(this.nuevoAlergenoNombre.trim()).subscribe({
      next: (nuevo) => {
        this.alergenos.push(nuevo);
        this.selectedAlergenosIds.add(nuevo.id);
        this.nuevoAlergenoNombre = '';
        this.showNuevoAlergenoModal = false;
        this.savingItem = false;
      },
      error: (err) => { console.error(err); this.savingItem = false; }
    });
  }

  // --- Nuevo Ingrediente ---
  guardarIngrediente() {
    if (!this.nuevoIngredienteNombre.trim()) return;
    this.savingItem = true;
    this.platoService.createIngrediente(this.nuevoIngredienteNombre.trim()).subscribe({
      next: (nuevo) => {
        this.ingredientes.push(nuevo);
        this.selectedIngredientesIds.add(nuevo.id);
        this.nuevoIngredienteNombre = '';
        this.showNuevoIngredienteModal = false;
        this.savingItem = false;
      },
      error: (err) => { console.error(err); this.savingItem = false; }
    });
  }

  // --- Modo eliminar: pide confirmación ---
  pedirConfirmacionEliminar(tipo: 'alergeno' | 'ingrediente', item: any) {
    this.confirmTipo = tipo;
    this.confirmItem = item;
    this.showConfirmModal = true;
  }

  cancelarConfirmacion() {
    this.showConfirmModal = false;
    this.confirmTipo = null;
    this.confirmItem = null;
  }

  confirmarEliminar() {
    if (!this.confirmItem) return;
    if (this.confirmTipo === 'alergeno') {
      this.platoService.deleteAlergeno(this.confirmItem.id).subscribe({
        next: () => {
          this.alergenos = this.alergenos.filter(a => a.id !== this.confirmItem.id);
          this.selectedAlergenosIds.delete(this.confirmItem.id);
          this.modoEliminarAlergeno = false;
          this.cancelarConfirmacion();
        },
        error: (err) => { console.error('Error eliminando alérgeno', err); this.cancelarConfirmacion(); }
      });
    } else if (this.confirmTipo === 'ingrediente') {
      this.platoService.deleteIngrediente(this.confirmItem.id).subscribe({
        next: () => {
          this.ingredientes = this.ingredientes.filter(i => i.id !== this.confirmItem.id);
          this.selectedIngredientesIds.delete(this.confirmItem.id);
          this.modoEliminarIngrediente = false;
          this.cancelarConfirmacion();
        },
        error: (err) => { console.error('Error eliminando ingrediente', err); this.cancelarConfirmacion(); }
      });
    }
  }
}
