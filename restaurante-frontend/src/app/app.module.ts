import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartaComponent } from './pages/carta/carta.component';
import { PlatoService } from './services/plato.service';
import { IngredientesModalComponent } from './components/ingredientes-modal/ingredientes-modal.component';
import { ConfirmarReservaComponent } from './pages/confirmar-reserva/confirmar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CartaComponent,
    IngredientesModalComponent,
    ConfirmarReservaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
