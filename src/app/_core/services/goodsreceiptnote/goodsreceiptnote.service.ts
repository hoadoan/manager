import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root'
})
export class GoodsreceiptnoteService {
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

  // GoodsReceiptNotes
  getGoodsReceiptNote(id: number):Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}/goods-receipt-note`, { headers: this.headers })
  }
  getGoodsReceiptNoteByID(id: number):Observable<any> {
    return this.httpClient.get(DOMAIN + `goods-receipt-note-management/goods-receipt-notes/${id}`, { headers: this.headers })
  }
  getGoodsReceiptNotes():Observable<any> {
    return this.httpClient.get(DOMAIN + `goods-receipt-note-management/goods-receipt-notes`, { headers: this.headers })
  }

  // Invoices

  getInvoices():Observable<any>{
    return this.httpClient.get(DOMAIN + `invoice-management/invoices`, { headers: this.headers})
  }


  getInvoiceByIdBatch(id:number):Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}/goods-issue-note`, { headers: this.headers })
  }



  getInvoiceDetail(id:number):Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}/invoice-detail`, { headers: this.headers })
  }

  getInvoice(id: number):Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}`, { headers: this.headers })
  }


}
