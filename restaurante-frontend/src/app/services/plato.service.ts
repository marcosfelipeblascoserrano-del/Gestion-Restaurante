import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plato } from '../models/plato';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private baseUrl = environment.apiUrl + '/platos';

  constructor(private http: HttpClient) { }

  getAllPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.baseUrl}?t=${new Date().getTime()}`);
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
    return this.http.get<any[]>(environment.apiUrl + '/alergenos');
  }

  createAlergeno(nombre: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/alergenos', { nombre });
  }

  deleteAlergeno(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/alergenos/${id}`);
  }

  // --- Ingredientes ---
  getAllIngredientes(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/ingredientes');
  }

  createIngrediente(nombre: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/ingredientes', { nombre });
  }

  deleteIngrediente(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/ingredientes/${id}`);
  }

}
