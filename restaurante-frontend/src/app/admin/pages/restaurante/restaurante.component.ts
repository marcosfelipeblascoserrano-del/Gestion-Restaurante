import { Component, OnInit } from '@angular/core';
import { AdminRestauranteService } from '../../services/admin-restaurante.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  config: any = null;
  loading = true;
  saving = false;
  successMessage = '';

  constructor(private restauranteService: AdminRestauranteService) {}

  ngOnInit(): void {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.loading = true;
    this.restauranteService.getConfiguracion().subscribe({
      next: (data) => {
        this.config = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando config', err);
        this.loading = false;
      }
    });
  }

  guardarCambios() {
    this.saving = true;
    this.successMessage = '';
    
    // We assume time formats are correct "HH:mm:ss" 
    // In HTML we will use input type="time" which outputs "HH:mm"
    // We might need to append ":00" if backend expects it
    if (this.config.horaApertura && this.config.horaApertura.length === 5) {
      this.config.horaApertura += ':00';
    }
    if (this.config.horaCierre && this.config.horaCierre.length === 5) {
      this.config.horaCierre += ':00';
    }

    this.restauranteService.actualizarConfiguracion(this.config).subscribe({
      next: (data) => {
        this.config = data;
        this.saving = false;
        this.successMessage = 'Configuración guardada exitosamente.';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error guardando', err);
        this.saving = false;
      }
    });
  }
}
