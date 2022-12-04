import { SupplierService } from './../../../../_core/services/supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { BatchInfo } from 'src/app/_core/utils/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.css']
})
export class DetailSupplierComponent implements OnInit {

  id : number = 0
  isVisible = false;
  supplierName: string = ''
  checkError: boolean = false
  nameOld: string = ''
  supplierDetail : BatchInfo[] = []
  subParam!: Subscription;
  confirmModal?: NzModalRef;
  constructor(
    private supplier: SupplierService,
    private router: Router,
    private atvRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      this.supplier.getListBatchOfSupplier(params['id']).subscribe((result)=>{
        this.supplierDetail = result.data
      })
      this.supplier.getSupplierById(params['id']).subscribe((result)=>{
        this.supplierName = result.data.name
        this.nameOld = result.data.name
        this.id = result.data.id
      })
    })
  }

  detailGoodsReceiptNote(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.supplierName == '') {
      this.checkError = true
    } else {
      var formdata = new FormData()
      formdata.append('name', this.supplierName);
      this.isVisible = false;
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi tên nhà cung cấp',
        nzContent: 'Bạn có muốn thay đổi tên nhà cung cấp không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.supplier.updateSupplier(this.id,formdata).subscribe((result) => {
            this.notification.create(
              'success',
              result.message, ''
            )
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
              console.log(currentUrl);
            });
          }, (err) => {
            this.notification.create(
              'error',
              err.error.message, ''
            )
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
            });
          })
        },
        nzOnCancel: ()=>{
          let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      });

    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }

}
