import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root'
})
export class PointService {
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

  getPoint():Observable<any> {
    return this.httpClient.get(DOMAIN + `point-management/points/information`, { headers: this.headers })
  }
  putPoint(data: any):Observable<any> {
    return this.httpClient.put(DOMAIN + `point-management/points`,data, { headers: this.headers })
  }
}
