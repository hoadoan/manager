import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

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

  // SamplePrescription
  getAllSamplePrescription(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'sale-management/sample-prescriptions', { headers: this.headers })
  }



  // Detail SamplePrescription
  getAllSamplePrescriptionDetail(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'sale-management/sample-prescription-details', { headers: this.headers })
  }


  // Disease
  getAllDisease(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'sale-management/diseases', { headers: this.headers })
  }
  postDisease(data: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'sale-management/diseases',data, { headers: this.headers })
  }
}
