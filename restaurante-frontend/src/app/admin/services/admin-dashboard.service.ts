import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }
}
