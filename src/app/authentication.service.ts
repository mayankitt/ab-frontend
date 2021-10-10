import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserAuthenticated(): boolean {
    const expiration: number = parseFloat(localStorage.getItem('tokenExpiration'));
    if (localStorage.getItem('token') !== null && expiration !== null) {
      const now = new Date();
      const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
      console.log('On Client - ' + utcSecondsSinceEpoch);
      console.log('From Server - ' + expiration);
      if (utcSecondsSinceEpoch > expiration) {
        console.error('Token has expired');
        return false;
      }
      return true;
    }
    return false;
  }

  constructor() { }
}
