import { Component, Input } from '@angular/core';
import { Plato } from '../../models/plato';

@Component({
  selector: 'app-ingredientes-modal',
  templateUrl: './ingredientes-modal.component.html',
  styleUrls: ['./ingredientes-modal.component.css']
})
export class IngredientesModalComponent {
  @Input() plato: Plato | null = null;
}
