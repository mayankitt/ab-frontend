import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestServerService {

  private loginEndpoint = environment.baseUrl + 'api/user/login';

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
}
