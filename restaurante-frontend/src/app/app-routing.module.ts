import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartaComponent } from './pages/carta/carta.component';
import { ConfirmarReservaComponent } from './pages/confirmar-reserva/confirmar-reserva.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'carta', component: CartaComponent },
  { path: 'confirmar-reserva', component: ConfirmarReservaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
