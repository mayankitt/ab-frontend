import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserAuthenticated(): boolean {
    return true;
  }

  constructor() { }
}
