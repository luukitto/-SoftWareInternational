import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesManagersService {
  private apiUrl = 'http://localhost:3000/firebase';

  constructor(private http: HttpClient) {}

  getSalesManagers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/readUsers`);
  }

  addUser(user: any): Observable<any> {
    console.log('Sending addUser request with:', user);
    return this.http.post<any>(`${this.apiUrl}/addUser`, user);
  }

  addSale(userId: string, sale: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addSale/${userId}`, sale);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserById/${id}`);
  }

  getFilteredSalesManagers(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/filter`, filters);
  }
}
