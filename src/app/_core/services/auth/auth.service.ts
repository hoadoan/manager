import { HttpClient } from '@angular/common/http';
import { DOMAIN } from './../../utils/configApp';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string = ''

  constructor(
    private route: Router,
    private httpClient: HttpClient
  ) { }

  login(formData: FormData) {
    return this.httpClient.post(DOMAIN + `auth/user/login`, formData);
  }
  getTokenVerifyPassword(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'user-management/token-verify-password', data)
  }
  resetPassword(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/accounts/reset-password', data)
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }


}
