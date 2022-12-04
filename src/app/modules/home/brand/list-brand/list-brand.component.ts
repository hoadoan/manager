import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { BrandsService } from 'src/app/_core/services/brands/brands.service';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {

  loading: boolean = true
  listsearch: any[] = []
  listData: any[] = []
  searchValue: string = ''
  selectedProvince: string = 'SearchName'
  isVisible = false;
  factoryName: string = ''
  checkError: boolean = false
  confirmModal?: NzModalRef;
  nameList = [
    { text: 'Hoạt động', value: true },
    { text: 'Ngừng hoạt động', value: false }
  ];
  nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)

  constructor(
    private brand: BrandsService,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

    DetailBrand(id: number){
      this.router.navigate(['dashboard/detail-brand/' + id]);
    }

  ngOnInit(): void {
    this.brand.getAllBrand().subscribe((result) => {
      console.log(result);

      this.listData = result.data,
        this.listsearch = this.listData
      this.loading = false
    })
  }

  SearchOption(value: string) {
    this.selectedProvince = value
  }
  getListSearch() {
    console.log(this.searchValue);
    if (this.selectedProvince == "searchID") {
      this.listsearch = this.listData.filter(data => data.id.toString().includes(this.searchValue.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.listData.filter(data => data.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()))
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.factoryName == '') {
      this.checkError = true
    } else {
      var formdata = new FormData()
      formdata.append('name', this.factoryName);
      this.isVisible = false;

      this.brand.createBrand(formdata).subscribe((result: any) => {
        this.notification.create(
          'success',
          'Tạo nhà sản xuất mới thành công', ''
        )
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
        });
      }, (err: any) => {
        this.notification.create(
          'error',
          'Tạo nhà sản xuất mới thất bại', ''
        )
      })
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  isBrand(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho nhà sản xuất này ngừng hoạt động không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.brand.deleteBrand(id).subscribe(() => {
          this.notification.create(
            'success',
            'Ngừng hoạt động thành công', ''
          )
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, err => {
          console.log(err)
          this.notification.create(
            'error',
            'Ngừng hoạt động thất bại', ''
          )
        })
      },
    });
  }
  isUnBrand(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho nhà sản xuất này hoạt động lại không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.brand.deleteBrand(id).subscribe(() => {
          this.notification.create(
            'success',
            'Mở lại hoạt động thành công', ''
          )
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, err => {
          console.log(err)
          this.notification.create(
            'error',
            'Mở lại hoạt động thất bại',''
          )
        })
      },
    });
  }

}
