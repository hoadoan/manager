import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCESS_TOKEN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root'
})
export class SampleprescriptionService {

  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'})
  }
}
