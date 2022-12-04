import { DOMAIN, ACCESS_TOKEN } from './../../utils/configApp';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getAllBrand(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'brand-management/brands', { headers: this.headers })
  }
  getDetailByBrandID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `brand-management/brands/${id}/products`, { headers: this.headers })
  }
  getBrandName(id:number): Observable<any> {
    return this.httpClient.get(DOMAIN + `brand-management/brands/${id}`, { headers: this.headers })
  }

  getAllBrandActive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'brand-management/brands-active', { headers: this.headers })
  }
  createBrand(factoryName: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + `brand-management/brands`, factoryName, { headers: this.headers })
  }
  deleteBrand(id: number) {
    return this.httpClient.patch(DOMAIN + `brand-management/brands/${id}`, {}, { headers: this.headers })
  }
  updateBrand(id: number,brand: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `brand-management/brands/${id}`, brand, { headers: this.headers })
  }

}
