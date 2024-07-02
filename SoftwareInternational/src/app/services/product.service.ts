import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/firebase';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/read/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/write`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${product.id}`, product);
  }

  updateProductSold(productId: string, soldQuantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProductSold/${productId}`, {soldQuantity: Number(soldQuantity)})
  }

  sellProduct(id: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/sell/${id}`, { quantity });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
