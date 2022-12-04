import { Router } from '@angular/router';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { Component, OnInit } from '@angular/core';
import { GoodReceiptNote } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-receipt-note',
  templateUrl: './receipt-note.component.html',
  styleUrls: ['./receipt-note.component.css']
})
export class ReceiptNoteComponent implements OnInit {

  receiptnote: GoodReceiptNote[] = []
  searchData: string = ''
  listsearch: any
  selectedProvince = 'SearchBatchName'
  constructor(
    private receiptnotes: GoodsreceiptnoteService,
    private product: ProductService,
    private router: Router
  ) { }

  detailReceiptNote(id : number){
    this.router.navigate(["dashboard/detail-receipt-note/" + id])
  }

  ngOnInit(): void {
    this.receiptnotes.getGoodsReceiptNotes().subscribe((result)=>{
      this.receiptnote = result.data
      this.listsearch = this.receiptnote
      console.log(this.receiptnote)
    })
  }

  // getNameProductByIdBatch(id: number){
  //   this.product.getProductByIdBatch(id).subscribe((product)=>{
  //     return product.data.product.name
  //   })
  // }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);
    if (this.selectedProvince == "SearchBatchName") {
      this.listsearch = this.receiptnote.filter(data => data.batch.barcode.toString().toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchReceiptType") {
      this.listsearch = this.receiptnote.filter(data => data.goodsReceiptNoteType.name.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }
}
