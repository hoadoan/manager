import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductService } from './../../../../../_core/services/product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine-category',
  templateUrl: './medicine-category.component.html',
  styleUrls: ['./medicine-category.component.css']
})
export class MedicineCategoryComponent implements OnInit {

  value: string = '127381'
  searchData: string = ''
  listData: any[] = []
  listsearch: any
  selectedProvince = 'SearchName'
  loading: boolean = true;
  confirmModal?: NzModalRef;
  shelfName: string = ''
  checkError: boolean = false
  checkError_2: boolean = false
  isVisible: boolean = false
  nameList = [
    { text: 'Hoạt động', value: true },
    { text: 'Ngừng hoạt động', value: false }
  ];
  nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)

  constructor(
    private product: ProductService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {

    this.product.getAllCategory().subscribe((result) => {
      console.log(result.data);

      this.listData = result.data
      this.loading = false
      this.listsearch = this.listData
    })
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-category/' + id]);

  }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == "searchID") {
      this.listsearch = this.listData.filter(data => data.id.toString().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.listData.filter(data => data.name.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.shelfName == '') {
      this.checkError = true
      this.checkError_2 = false
    } else if(this.shelfName.length<6 || this.shelfName.length >150){
      this.checkError_2 = true
      this.checkError = false
    }
     else {
      var formdata = new FormData()
      formdata.append('name', this.shelfName);
      this.isVisible = false;

      this.confirmModal = this.modal.confirm({
        nzTitle: 'Tạo kệ hàng',
        nzContent: 'Bạn có muốn tạo kệ hàng không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.product.createCategory(formdata).subscribe((result) => {
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
          })
        },
      });


    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  deleteCategory(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho kệ hàng này ngừng hoạt động',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.deleteCategory(id).subscribe((rs) => {
          this.notification.create(
            'success',
            rs.message, ''
          )
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)
          this.notification.create(
            'error',
            err.error.message, ''
          )
        })
      },
    });
  }
  OpenCategory(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Mở lại hoạt động',
      nzContent: 'Bạn có muốn cho kệ hàng này mở lại hoạt động không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.deleteCategory(id).subscribe((rs) => {
          this.notification.create(
            'success',
            rs.message, ''
          )
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)
          this.notification.create(
            'error',
            err.error.message, ''
          )
        })
      },
    });
  }

}
