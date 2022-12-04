import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from 'src/app/_core/services/product/product.service';

@Component({
  selector: 'app-update-active-substance',
  templateUrl: './update-active-substance.component.html',
  styleUrls: ['./update-active-substance.component.css']
})
export class UpdateActiveSubstanceComponent implements OnInit {

  @Input() productId: number = 0
  @Input() listActiveSubstance: any[] = []
  activeSubstance: any[] = []
  listNew: any[] = []
  listAdd: any[] = []
  confirmModal?: NzModalRef;
  isVisibleChangeInfo: boolean = false
  constructor(
    private notification: NzNotificationService,
     private modal: NzModalService,
    private product: ProductService,
    private router : Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
    console.log(this.listActiveSubstance)
    this.product.getAllActiveSubstance().subscribe((result)=>{
      this.activeSubstance = result.data
      for (let i = 0; i < this.activeSubstance.length; i++) {
        for (let j = 0; j < this.listActiveSubstance.length; j++) {
            if(this.activeSubstance[i].id == this.listActiveSubstance[j].id){
              this.activeSubstance.splice(i,1)
            }
        }
      }
      console.log(this.activeSubstance)
    })
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false
    for (let index = 0; index < this.listNew.length; index++) {
      this.listAdd.push({
        productId : this.productId,
        activeSubstanceId: this.listNew[index]+''
      })
    }
    console.log(this.listAdd);

      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thêm hoạt chất',
        nzContent: 'Bạn có muốn thêm hoạt chất cho sản phẩm này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.product.addActiveSubstance(this.listAdd).subscribe((result) => {
            console.log(result);
            this.notification.create(
              'success',
              result.message,
              ''
            );
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
              console.log(currentUrl);
            });
          }, err => {
            this.notification.create(
              'error',
              err.message,
              ''
            );
          })
        }
      });
  }

  handleChangeInfoCancel() {
    this.isVisibleChangeInfo = false
    this.listNew = []
    this.listAdd =[]
  }

  changeInfo() {
    console.log(this.listNew);

  }

}
