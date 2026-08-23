import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private baseUrl = environment.apiUrl + '/platos';

  constructor(private http: HttpClient) { }

  getIngredientesPorPlato(platoId: number): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.baseUrl}/${platoId}/ingredientes`);
  }
}
