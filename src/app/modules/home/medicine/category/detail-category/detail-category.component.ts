import { Medicine } from './../../../../../_core/utils/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { query } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  id: number = 0
  name: string = ''
  nameOld: string = ''
  checkError: boolean = false
  isVisible = false;
  confirmModal?: NzModalRef;
  shelfs: Medicine[]=[]
  subParam!: Subscription;

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private product: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.product.getShelfById(params['id']).subscribe((result)=>{
        console.log(result.data)
        this.shelfs = result.data
      })
      this.product.getNameShelfById(params['id']).subscribe((result)=>{
        this.name = result.data.name
        this.nameOld = result.data.name
        this.id = result.data.id
      })
  }, (err: any) => {
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
        nzTitle: 'Thay đổi tên kệ hàng',
        nzContent: 'Bạn có muốn thay đổi tên kệ hàng không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.product.updateShelf(this.id,formdata).subscribe((result) => {
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
