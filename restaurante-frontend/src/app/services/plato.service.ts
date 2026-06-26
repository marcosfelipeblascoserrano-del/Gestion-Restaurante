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

}
