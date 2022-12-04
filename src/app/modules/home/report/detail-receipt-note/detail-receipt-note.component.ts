import { UserService } from './../../../../_core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoodsreceiptnoteService } from 'src/app/_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { GoodReceiptNote } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-detail-receipt-note',
  templateUrl: './detail-receipt-note.component.html',
  styleUrls: ['./detail-receipt-note.component.css']
})
export class DetailReceiptNoteComponent implements OnInit {

  receiptNoteDetails: GoodReceiptNote[] = []
  id: string =''
  goodsReceiptNoteType: string = ''
  batchId: number = 0
  batchBarcode: string =''
  manufacturingDate: string =''
  expiryDate: string =''
  supplierId: number =0
  supplierName: string =''
  isActiveSupplier: boolean = true
  quantity: number = 0
  unit: string =''
  totalPrice: number = 0
  baseUnitPrice: number = 0
  createdAt: string = ''
  createBy: string = ''
  subParam!: Subscription;

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private receiptNote: GoodsreceiptnoteService,
    private user: UserService
  ) { }

  detailSupplier(id: number) {
    this.router.navigate(['dashboard/detail-supplier/' + id]);
  }

  detailGoodsReceiptNote(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      this.receiptNote.getGoodsReceiptNoteByID(params['id']).subscribe((result)=>{
        this.receiptNoteDetails = result.data
        console.log(this.receiptNoteDetails)
        this.id = result.data.id
        this.goodsReceiptNoteType = result.data.goodsReceiptNoteType.name
        this.batchId = result.data.batch.id
        this.batchBarcode = result.data.batch.barcode
        this.manufacturingDate = result.data.batch.manufacturingDate
        this.expiryDate = result.data.batch.expiryDate
        this.supplierId = result.data.supplier.id
        this.supplierName = result.data.supplier.name
        this.isActiveSupplier = result.data.supplier.isActive
        this.quantity = result.data.quantity
        this.unit = result.data.unit
        this.totalPrice = result.data.totalPrice
        this.baseUnitPrice = result.data.baseUnitPrice
        this.createdAt = result.data.createdAt
        this.user.getProfilebyID(result.data.createdBy).subscribe((name)=>{
          this.createBy = name.data.fullname
        })
      })
    })
  }

}
