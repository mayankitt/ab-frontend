import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProductsTableItem } from './products-table/products-table-datasource';

@Injectable({
  providedIn: 'root'
})

export class RequestServerService {

  private loginEndpoint: string = environment.baseUrl + 'api/user/login';
  private getProductsEndpoint: string = environment.baseUrl + 'api/product/get_all';
  private updateProductEndpoint: string = environment.baseUrl + 'api/product/update';
  private createProductEndPoint: string = environment.baseUrl + 'api/product/create';
  private deleteProductEndPoint: string = environment.baseUrl + 'api/product/delete';

  requestHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  getAuthToken(email: string, password: string): Observable<any> {
    const requestBody = {
      email,
      password
    };
    this.requestHeaders = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Content-Type', 'application/json');
    return this.http.post(this.loginEndpoint, requestBody, { headers: this.requestHeaders });
  }

  getProducts(): Observable<any> {
    this.requestHeaders = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Authorization', localStorage.getItem('token'))
                        .set('Content-Type', 'application/json');
    return this.http.get(this.getProductsEndpoint, { headers: this.requestHeaders });
  }

  updateProduct(updatedProduct: ProductsTableItem): Observable<any> {
    this.requestHeaders = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Authorization', localStorage.getItem('token'))
                        .set('Content-Type', 'application/json');
    return this.http.put(this.updateProductEndpoint, updatedProduct, { headers: this.requestHeaders });
  }

  createProduct(requestBody: ProductsTableItem): Observable<any> {
    this.requestHeaders = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Authorization', localStorage.getItem('token'))
                        .set('Content-Type', 'application/json');
    return this.http.post(this.createProductEndPoint, requestBody, { headers: this.requestHeaders });
  }

  deleteProduct(selected: string): Observable<any> {
    this.requestHeaders = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Authorization', localStorage.getItem('token'))
                        .set('Content-Type', 'application/json');
    const requestBody = {
      id: selected
    };
    return this.http.post(this.deleteProductEndPoint, requestBody, { headers: this.requestHeaders });
  }

}
