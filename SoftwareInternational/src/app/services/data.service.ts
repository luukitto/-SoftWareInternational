import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  writeData(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/write`, data);
  }

  readData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/read`);
  }
}
