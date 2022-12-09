import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SupplierService } from './../../../../_core/services/supplier/supplier.service';
import { Supplier } from './../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css'],
})
export class ListSupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  searchData: string = '';
  listsearch: any;
  selectedProvince = 'searchName';
  isVisible = false;
  supplierName: string = '';
  supplierPhone: string = '';
  checkError: boolean = false;
  checkErrorPhone: boolean = false;
  loading: boolean = true;
  confirmModal?: NzModalRef;
  nameList = [
    { text: 'Hoạt động', value: true },
    { text: 'Đã bị chặn', value: false },
  ];
  nameFilterFn = (list: string[], item: any): boolean =>
    list.some((value) => item.isActive == value);
  constructor(
    private supplier: SupplierService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.supplier.getSupplier().subscribe((result) => {
      console.log(result);

      this.suppliers = result.data;
      this.loading = false;
      this.listsearch = this.suppliers;
    });
  }

  Detail(id: number) {
    this.router.navigate(['dashboard/detail-supplier/' + id]);
  }

  SearchOption(value: string) {
    this.selectedProvince = value;
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == 'searchPhone') {
      this.listsearch = this.suppliers.filter((data) =>
        data.phoneNumber.toString().includes(this.searchData.toLocaleLowerCase())
      );
    } else if (this.selectedProvince == 'searchName') {
      this.listsearch = this.suppliers.filter((data) =>
        data.name
          .toLocaleLowerCase()
          .includes(this.searchData.toLocaleLowerCase())
      );
    }
  }

  clickBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Chặn',
      nzContent: 'Bạn có muốn chặn nhà cung cấp này không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.supplier.isBan(id).subscribe(
          () => {
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
                console.log(currentUrl);
              });
          },
          (err) => {
            console.log(err);
          }
        );
      },
    });
  }

  clickUnBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bỏ chặn',
      nzContent: 'Bạn có muốn bỏ chặn nhà cung cấp này',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.supplier.isBan(id).subscribe(
          () => {
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
                console.log(currentUrl);
              });
          },
          (err) => {
            console.log(err);
          }
        );
      },
    });
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.supplierName == '') {
      this.checkError = true;
    }else if(this.supplierPhone == ''){
      this.checkErrorPhone = true;
    }
    else {
      var formdata = new FormData();
      formdata.append('name', this.supplierName);
      formdata.append('phoneNumber','0' + this.supplierPhone);
      this.isVisible = false;
      this.supplier.createSupplier(formdata).subscribe(
        (result: any) => {
          console.log(result);
          this.notification.create(
            'success',
            'Tạo nhà cung cấp mới thành công',
            ''
          );
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
              console.log(currentUrl);
            });
        },
        (err: any) => {
          this.notification.create(
            'error',
            'Tạo nhà cung cấp mới thất bại',
            ''
          );
        }
      );
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
