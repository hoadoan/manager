import { ProductService } from 'src/app/_core/services/product/product.service';
import { GoodsreceiptnoteService } from './../../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import {
  BatchInfo,
  GoodIssueNote,
  GoodReceiptNote,
} from './../../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-receipt-note',
  templateUrl: './list-receipt-note.component.html',
  styleUrls: ['./list-receipt-note.component.css'],
})
export class ListReceiptNoteComponent implements OnInit {
  goodReceiptNote: GoodReceiptNote[] = [];
  goodIssueNote: GoodIssueNote[] = [];
  batchInfo: BatchInfo[] = [];

  goodReceiptNoteTitle = [
    {
      title: 'Mã nhập hàng',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.id - b.id,
      priority: false
    },
    {
      title: 'Dạng nhập hàng',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.goodsReceiptNoteType.name.localeCompare(b.goodsReceiptNoteType.name),
      priority: false
    },
    {
      title: 'Nơi cung cấp',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.supplier.name.localeCompare(b.supplier.name),
      priority: false
    },
    {
      title: 'Ngày tạo',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.createdAt.localeCompare(b.createdAt),
      priority: false
    },
    {
      title: 'Số lượng',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.quantity - b.quantity,
      priority: 2
    },
    {
      title: 'Tổng tiền',
      compare: (a: GoodReceiptNote, b: GoodReceiptNote) => a.totalPrice - b.totalPrice,
      priority: 3
    }
  ];

  goodIssueNoteTitle = [
    {
      title: 'Mã xuất hàng',
      compare: (a: GoodIssueNote, b: GoodIssueNote) => a.id - b.id,
      priority: 1
    },
    {
      title: 'Dạng xuất hàng',
      compare: (a: GoodIssueNote, b: GoodIssueNote) => a.goodsIssueNoteType.name.localeCompare(b.goodsIssueNoteType.name),
      priority: false
    },
    {
      title: 'Số lượng',
      compare: (a: GoodIssueNote, b: GoodIssueNote) => a.quantity - b.quantity,
      priority: 2
    },
    {
      title: 'Đơn vị',
      compare: (a: GoodIssueNote, b: GoodIssueNote) => a.unit.localeCompare(b.unit),
      priority: false
    },
    {
      title: 'Tổng tiền',
      compare: (a: GoodIssueNote, b: GoodIssueNote) => a.totalPrice - b.totalPrice,
      priority: 3
    }
  ];

  batchId: string = '';
  batchBarcode: string = '';
  productId: number = 0
  productName: string = '';
  currentQuantity: string = '';
  currentQuantityUnit: string = '';
  manufacturingDate: string = '';
  expiryDate: string = '';
  isActive: boolean = true;
  createdAt: string = '';
  createdBy: string = '';
  updatedAt: string = '';
  updatedBy: string = '';
  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute,
    private GRNService: GoodsreceiptnoteService,
    private batch: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      // phiếu nhập
      this.GRNService.getGoodsReceiptNote(params['id']).subscribe((result) => {
        console.log(result.data);
        this.goodReceiptNote = result.data;
      });
      //phiếu xuất
      this.GRNService.getInvoiceByIdBatch(params['id']).subscribe((result) => {
        console.log(result.data)
        this.goodIssueNote = result.data;
      });
      // thông tin lô hàng
      this.batch.getProductByIdBatch(params['id']).subscribe((batchInfo) => {
        console.log(batchInfo.data);
        this.batchId = batchInfo.data.id;
        this.batchBarcode = batchInfo.data.batchBarcode;
        this.productId = batchInfo.data.product.id
        this.productName = batchInfo.data.product.name;
        this.manufacturingDate = batchInfo.data.manufacturingDate;
        this.expiryDate = batchInfo.data.expiryDate;
        this.createdAt = batchInfo.data.createdAt;
        this.createdBy = batchInfo.data.createdBy.name;
        this.currentQuantity =
          batchInfo.data.currentQuantity[0].currentQuantity;
        this.currentQuantityUnit = batchInfo.data.currentQuantity[0].unit;
      });
    });
  }

  detailReceiptNote(id : number){
    this.router.navigate(["dashboard/detail-receipt-note/" + id])
  }
  detailIssueNote(id : number){
    this.router.navigate(["dashboard/detail-invoice/" + id])
  }
  detailSupplier(id : number){
    this.router.navigate(["dashboard/detail-supplier/" + id])
  }
  detailMedicine(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }
}
