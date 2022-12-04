import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ACCESS_TOKEN, DOMAIN } from './../../utils/configApp';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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


  isBan(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + `user-management/users/ban/${id}`, {}, { headers: this.headers });
  }

  isUnBan(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + `user-management/users/unban/${id}`, {}, { headers: this.headers });
  }

  //Manager

  getManager(index: string, size: string): Observable<any> {
    console.log(this.token!)
    return this.httpClient.get(DOMAIN + `user-management/managers?pageIndex=1&pageSize=5`, { headers: this.headers });
  }
  getProfile(): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/auth/user/profile`, { headers: this.headers })
  }
  getProfilebyID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/profile/${id}`, { headers: this.headers })
  }

  // Staff
  getStaffs(): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/staffs`, { headers: this.headers })
  }
  createStaff(staffData: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + `user-management/staffs`, staffData, { headers: this.headers })
  }
  changePassword(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/accounts/change-password`, data, { headers: this.headers })
  }

  changePasswordforStaff(id: number): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/users/recovery-password/${id}`,{}, { headers: this.headers })
  }
  changeInfo(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/managers/profile`, data, { headers: this.headers })
  }
  changeInfoStaff(id:number, data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/staffs/profile/${id}`, data, { headers: this.headers })
  }

  // Customer
  getCustomers(): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers`, { headers: this.headers })
  }
  getCustomer(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers/${id}`, { headers: this.headers })
  }
  getInvoicesByIdUser(id : number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/customers/${id}/invoices`, { headers: this.headers })
  }

  getInvoiceByIdStaff(id:number):Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/users/${id}/invoices`, { headers: this.headers })
  }

}
