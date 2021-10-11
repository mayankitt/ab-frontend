import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserAuthenticated(): boolean {
    const expiration: number = parseFloat(localStorage.getItem('tokenExpiration'));
    if (localStorage.getItem('token') !== null && expiration !== null && expiration > 0) {
      const now = new Date();
      const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
      console.log('On Client - ' + utcSecondsSinceEpoch);
      console.log('From Server - ' + expiration);
      if (utcSecondsSinceEpoch > expiration) {
        console.error('Token has expired');
        localStorage.clear();
        return false;
      }
      return true;
    }
    localStorage.clear();
    return false;
  }

  constructor() { }
}
