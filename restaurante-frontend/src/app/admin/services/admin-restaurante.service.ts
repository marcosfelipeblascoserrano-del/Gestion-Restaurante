import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRestauranteService {
  private apiUrl = environment.apiUrl + '/restaurante';

  constructor(private http: HttpClient) { }

  getConfiguracion(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  actualizarConfiguracion(config: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, config);
  }
}
