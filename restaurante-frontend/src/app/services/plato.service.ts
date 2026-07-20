import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plato } from '../models/plato';

@Injectable({
    providedIn: 'root'
})
export class PlatoService {

    private baseUrl = 'http://localhost:8080/api/platos';

    constructor(private http: HttpClient) { }

    getAllPlatos(): Observable<Plato[]> {
        return this.http.get<Plato[]>(this.baseUrl);
    }

    createPlato(plato: Plato): Observable<Plato> {
        return this.http.post<Plato>(this.baseUrl, plato);
    }

    updatePlato(id: number, plato: Plato): Observable<Plato> {
        return this.http.put<Plato>(`${this.baseUrl}/${id}`, plato);
    }

    deletePlato(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // --- Alérgenos ---
    getAllAlergenos(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/api/alergenos');
    }

    createAlergeno(nombre: string): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/alergenos', { nombre });
    }

    // --- Ingredientes ---
    getAllIngredientes(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/api/ingredientes');
    }

    createIngrediente(nombre: string): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/ingredientes', { nombre });
    }

}
