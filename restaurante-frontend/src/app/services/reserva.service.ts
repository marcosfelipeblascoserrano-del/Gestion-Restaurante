import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaRequest, SlotDisponibilidad } from '../models/reserva';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private urlEndPoint: string = 'http://localhost:8080/api/reservas';

    constructor(private http: HttpClient) { }

    getDisponibilidad(fecha: string): Observable<SlotDisponibilidad[]> {
        const params = new HttpParams().set('fecha', fecha);
        return this.http.get<SlotDisponibilidad[]>(`${this.urlEndPoint}/disponibilidad`, { params });
    }

    crearReserva(reserva: ReservaRequest): Observable<any> {
        return this.http.post<any>(this.urlEndPoint, reserva);
    }
}
