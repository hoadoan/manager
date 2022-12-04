import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

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
  getSupplier(): Observable<any> {
    return this.httpClient.get(DOMAIN + `suppliers-management/suppliers`, { headers: this.headers })
  }
  getSupplierById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `suppliers-management/suppliers/${id}`, { headers: this.headers })
  }
  isBan(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + `suppliers-management/suppliers/${id}`,{}, { headers: this.headers });
  }
  createSupplier(supplierName: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'suppliers-management/suppliers',supplierName, { headers: this.headers });
  }
  getListBatchOfSupplier(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `suppliers-management/suppliers/${id}/batches`, { headers: this.headers });
  }
  updateSupplier(id: number,supplier: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `suppliers-management/suppliers/${id}`, supplier, { headers: this.headers })
  }
}
