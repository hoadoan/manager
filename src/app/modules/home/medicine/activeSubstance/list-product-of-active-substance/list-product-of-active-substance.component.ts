import { ProductService } from 'src/app/_core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-list-product-of-active-substance',
  templateUrl: './list-product-of-active-substance.component.html',
  styleUrls: ['./list-product-of-active-substance.component.css']
})
export class ListProductOfActiveSubstanceComponent implements OnInit {

  isVisible = false;
  id: number = 0
  name: string = ''
  nameOld: string =''
  checkError: boolean = false
  width: number = 1
  height: number = 50
  productHaveActiveSubstance: any[] = []
  subParam!: Subscription;
  confirmModal?: NzModalRef;
  constructor(
    private atvRoute: ActivatedRoute,
    private router : Router,
    private product: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
    console.log(params['id'])
    this.product.getActiveSubstanceById(params['id']).subscribe((result)=>{
      console.log(result)
      this.productHaveActiveSubstance = result.data
    })
    this.product.getNameActiveSubstanceById(params['id']).subscribe((result)=>{
      this.name = result.data.name
      this.nameOld = result.data.name
      this.id = result.data.id
    })
  },err => {
    console.log(err)
    this.router.navigate(['/404'])
  });
}

showModal(): void {
  this.isVisible = true;
}
handleOk(): void {
  if (this.name == '') {
    this.checkError = true
  } else {
    var formdata = new FormData()
    formdata.append('name', this.name);
    this.isVisible = false;
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Thay đổi tên hoạt chất',
      nzContent: 'Bạn có muốn thay đổi tên hoạt chất không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.updateAS(this.id,formdata).subscribe((result) => {
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
