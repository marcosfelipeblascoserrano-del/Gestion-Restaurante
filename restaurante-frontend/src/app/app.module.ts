import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartaComponent } from './pages/carta/carta.component';
import { PlatoService } from './services/plato.service';
import { IngredientesModalComponent } from './components/ingredientes-modal/ingredientes-modal.component';
import { ConfirmarReservaComponent } from './pages/confirmar-reserva/confirmar-reserva.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { PoliticaCookiesComponent } from './pages/politica-cookies/politica-cookies.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { AvisoLegalComponent } from './pages/aviso-legal/aviso-legal.component';
import { ConfigurarCookiesComponent } from './pages/configurar-cookies/configurar-cookies.component';
import { JwtInterceptor } from './admin/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CartaComponent,
    IngredientesModalComponent,
    ConfirmarReservaComponent,
    CookieConsentComponent,
    PoliticaCookiesComponent,
    PoliticaPrivacidadComponent,
    AvisoLegalComponent,
    ConfigurarCookiesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PlatoService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
