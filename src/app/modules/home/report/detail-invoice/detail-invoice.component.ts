import {
  InvoiceById,
  InvoiceDetail,
} from './../../../../_core/utils/interface';
import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css'],
})
export class DetailInvoiceComponent implements OnInit {
  id: string = '';
  invoiceDetails: InvoiceDetail[] = [];
  barcodeInvoice: string = ''
  quantity: number = 0;
  unit: string = '';
  unitPrice: number = 0;
  convertedQuantity: number = 0;
  invoiceInfo: InvoiceById[] = [];
  subParam!: Subscription;
  totalPrice: number = 0;
  customerName: string=''
  staffId: number = 0
  staffName: string = ''
  customerPhone: string = ''
  discount : string =''
  createdAt: string =''

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private invoice: GoodsreceiptnoteService
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        console.log(params['id']);
        this.invoice.getInvoice(params['id']).subscribe((result) => {
          this.invoiceInfo = result.data;
          console.log(this.invoiceInfo);
          // this.totalPrice = result.data.totalPrice;
          this.quantity = result.data.quantity;
          this.barcodeInvoice = result.data.barcode
          this.unit = result.data.unit;
          this.unitPrice = result.data.unitPrice;
          this.convertedQuantity = result.data.convertedQuantity
          this.customerName = result.data.customer.fullName
          this.staffId = result.data.createdBy.id
          this.staffName = result.data.createdBy.name
          this.customerPhone = result.data.customer.phoneNumber
          this.discount = result.data.discount
          this.createdAt = result.data.createdAt
        });
        this.invoice
          .getInvoiceDetail(params['id'])
          .subscribe((invoiceDetails) => {
            this.invoiceDetails = invoiceDetails.data;
            console.log(this.invoiceDetails);
            this.invoiceDetails.forEach(element => {
              this.totalPrice += (element.quantity*element.unitPrice)
            });
          });
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/404']);
      }
    );
  }


  detailGoodsReceiptNote(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }

  detailMedicine(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  detailStaff(id: number) {
    this.router.navigate(['dashboard/detail-staff/' + id]);
  }
}
