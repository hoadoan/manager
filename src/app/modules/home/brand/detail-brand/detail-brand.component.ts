import { Medicine } from './../../../../_core/utils/interface';
import { BrandsService } from './../../../../_core/services/brands/brands.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-detail-brand',
  templateUrl: './detail-brand.component.html',
  styleUrls: ['./detail-brand.component.css']
})
export class DetailBrandComponent implements OnInit {

  isVisible = false;
  id: number = 0
  brandName: string = ''
  brandOld: string = ''
  checkError: boolean = false
  brandDetail : Medicine[] = []
  subParam!: Subscription;
  confirmModal?: NzModalRef;
  constructor(
    private brand: BrandsService,
    private router: Router,
    private atvRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      this.brand.getDetailByBrandID(params['id']).subscribe((result)=>{
        this.brandDetail = result.data

      })
      this.brand.getBrandName(params['id']).subscribe((name)=>{
        this.brandName = name.data.name
        this.brandOld = this.brandName
        this.id = name.data.id
        console.log(name.data)
      })
    })
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.brandName == '') {
      this.checkError = true
    } else {
      var formdata = new FormData()
      formdata.append('name', this.brandName);
      this.isVisible = false;
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi tên nhà sản xuất',
        nzContent: 'Bạn có muốn thay đổi tên nhà sản xuất không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.brand.updateBrand(this.id,formdata).subscribe((result) => {
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
