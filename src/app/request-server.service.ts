import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsTableItem } from './products-table/products-table-datasource';

@Injectable({
  providedIn: 'root'
})

export class RequestServerService {

  private loginEndpoint: string = environment.baseUrl + 'api/user/login';
  private getProductsEndpoint: string = environment.baseUrl + 'api/product/get_all';
  private updateProductEndpoint: string = environment.baseUrl + 'api/product/update';

  requestHeader = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Authorization', localStorage.getItem('token'))
                        .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAuthToken(email: string, password: string): Observable<any> {
    const requestBody = {
      email,
      password
    };
    return this.http.post(this.loginEndpoint, requestBody, { headers: this.requestHeader });
  }

  getProducts(): Observable<any> {
    return this.http.get(this.getProductsEndpoint, { headers: this.requestHeader });
  }

  updateProduct(updatedProduct: ProductsTableItem): Observable<any> {
    return this.http.put(this.updateProductEndpoint, updatedProduct, { headers: this.requestHeader });
  }
}
