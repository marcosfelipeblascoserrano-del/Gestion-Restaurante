import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartaComponent } from './pages/carta/carta.component';
import { ConfirmarReservaComponent } from './pages/confirmar-reserva/confirmar-reserva.component';

import { PoliticaCookiesComponent } from './pages/politica-cookies/politica-cookies.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { AvisoLegalComponent } from './pages/aviso-legal/aviso-legal.component';
import { ConfigurarCookiesComponent } from './pages/configurar-cookies/configurar-cookies.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'carta', component: CartaComponent },
  { path: 'confirmar-reserva', component: ConfirmarReservaComponent },
  { path: 'politica-cookies', component: PoliticaCookiesComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'aviso-legal', component: AvisoLegalComponent },
  { path: 'configurar-cookies', component: ConfigurarCookiesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
