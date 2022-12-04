import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from './../../../../../_core/services/product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-active-substance',
  templateUrl: './list-active-substance.component.html',
  styleUrls: ['./list-active-substance.component.css']
})
export class ListActiveSubstanceComponent implements OnInit {

  value:string = '127381'
  searchData: string = ''
  listData: any[] = []
  listProductHaveActiveSubstance : any[] = []
  listsearch: any
  selectedProvince = 'SearchName'
  loading: boolean = true;
  confirmModal?: NzModalRef;
  activeSubstanceName: string = ''
  checkError: boolean = false
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
    this.product.getAllActiveSubstance().subscribe((result) => {
      console.log(result);
      this.listData = result.data
      this.loading = false
      this.listsearch = this.listData
    })

  }

  detail(id: number) {
    this.router.navigate(['dashboard/medicine-activeSubstance/' + id]);
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
    if (this.activeSubstanceName == '') {
      this.checkError = true
    } else {
      var formdata = new FormData()
      formdata.append('name', this.activeSubstanceName);
      this.isVisible = false;

      this.product.createActiveSubstance(formdata).subscribe((result) => {
        this.notification.create(
          'success',
          'Tạo hoạt chất mới thành công', ''
        )
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
        });
      }, (err) => {
        this.notification.create(
          'error',
          'Tạo hoạt chất mới thất bại', err.error.message
        )
      })
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  deleteActiveSubstance(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho hoạt chất này ngừng hoạt động không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.deleteActiveSubstance(id).subscribe(() => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)

        })
      },
    });
  }

  ActiveSubstance(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Mở lại hoạt động',
      nzContent: 'Bạn có muốn cho hoạt chất này hoạt động trở lại không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.deleteActiveSubstance(id).subscribe(() => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)

        })
      },
    });
  }
}
