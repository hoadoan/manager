import { Noti } from './../../utils/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: this.token!,
      accept: '*/*',
      'Access-Control-Allow-Origin': '*',
    });
  }

  getRecentSales(
    day: boolean,
    month: boolean,
    year: boolean,
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/recent-sales?byDay=${day}&byMonth=${month}&byYear=${year}&size=${size}`,
      { headers: this.headers }
    );
  }

  getTopSellingDay(
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/top-selling?byDay=true&byMonth=false&byYear=false&size=${size}`,
      { headers: this.headers }
    );
  }
  getTopSellingMonth(
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/top-selling?byDay=false&byMonth=true&byYear=false&size=${size}`,
      { headers: this.headers }
    );
  }
  getTopSellingYear(
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/top-selling?byDay=false&byMonth=false&byYear=true&size=${size}`,
      { headers: this.headers }
    );
  }

  getSaleInfo(): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/sale-information`,
      { headers: this.headers }
    );
  }

  getNotifications(): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `notification/filter`,
      { headers: this.headers }
    );
  }
  getAllNotification(): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `notification`,
      { headers: this.headers }
    );
  }
  getNotification(date: string): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `notification/${date}/detail`,
      { headers: this.headers }
    );
  }

  getChartByDay():Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/chart?byWeek=true`,
      { headers: this.headers }
    );
  }
  getChartByMonth():Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/chart?byMonth=true`,
      { headers: this.headers }
    );
  }
  getChartByYear():Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/chart?byYear=true`,
      { headers: this.headers }
    );
  }
}
