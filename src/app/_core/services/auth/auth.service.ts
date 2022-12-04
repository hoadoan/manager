import { HttpClient } from '@angular/common/http';
import { DOMAIN } from './../../utils/configApp';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

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


  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }


}
