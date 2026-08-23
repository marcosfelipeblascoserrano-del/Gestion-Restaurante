import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = environment.apiUrl + '/categorias';

  constructor(private http: HttpClient) { }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}?t=${new Date().getTime()}`);
  }
}
