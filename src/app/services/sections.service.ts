import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Secciones, Campo } from '../interfaces/sections.interface';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  apiGnpUri: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.apiGnpUri = `${environment.apiURI}`;
  }

  getSection(id: number): Observable<Secciones> {
    return this.http.get<Secciones>(`${this.apiGnpUri}/configurador/seccion?id_seccion=${id}`).pipe(map(res => res));
  }
}
