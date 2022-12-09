import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
// import { Person } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { Medicine } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css'],
})
export class ListMedicineComponent implements OnInit {
  searchData: string = '';
  listData: Medicine[] = [];
  listProductWithASInactive: Medicine[] = [];
  listProductWithBrandInactive: Medicine[] = [];
  listProductWithSupplierInactive: Medicine[] = [];
  listsearch: any[] = [];
  loading: boolean = true;
  searchValue: string = '';
  selectedProvince: string = 'searchID';
  width: number = 1;
  height: number = 50;
  isVisible: boolean = false;
  confirmModal?: NzModalRef;
  activeSubstanceName: string = '';
  checkError: boolean = false;
  // nameList = [
  //   { text: 'Còn bán', value: true },
  //   { text: 'Ngừng bán', value: false }
  // ];
  // nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)

  constructor(
    private router: Router,
    private product: ProductService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    // get active product
    this.product.getAllProduct().subscribe((result) => {
      console.log(result);
      this.listData = result.data;
      this.listsearch = this.listData;
      this.loading = false;
    });

    // get inactive product because brand
    this.product.getAllProductIsBrandInactive().subscribe((result) => {
      console.log(result);
      this.listProductWithBrandInactive = result.data;
      // this.listsearch = this.listData;
      this.loading = false;
    });

    // get inactive product because supplier
    this.product.getAllProductIsSupplierInactive().subscribe((result) => {
      console.log(result);
      this.listProductWithSupplierInactive = result.data;
      // this.listsearch = this.listData;
      this.loading = false;
    });

    // get inactive product because activeSubstance
    this.product.getAllProductIsActiveSubstanceInactive().subscribe((result) => {
      console.log(result);
      this.listProductWithASInactive = result.data;
      // this.listsearch = this.listData;
      this.loading = false;
    });
  }

  SearchOption(value: string) {
    this.selectedProvince = value;
    console.log(this.selectedProvince);
  }

  // search for list All
  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == 'searchBarcode') {
      this.listsearch = this.listData.filter((data) =>
        data.barcode.toString().includes(this.searchData.toLocaleLowerCase())
      );
    } else if (this.selectedProvince == 'SearchName') {
      this.listsearch = this.listData.filter((data) =>
        data.name
          .toLocaleLowerCase()
          .includes(this.searchData.toLocaleLowerCase())
      );
    } else if (this.selectedProvince == 'searchID') {
      this.listsearch = this.listData.filter((data) =>
        data.drugRegistrationNumber
          .toLocaleLowerCase()
          .includes(this.searchData.toLocaleLowerCase())
      );
    }
  }

    // search for list product have inactive AS
    getListSearchAS() {
      console.log(this.searchData);

      if (this.selectedProvince == 'searchBarcode') {
        this.listsearch = this.listProductWithASInactive.filter((data) =>
          data.barcode.toString().includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'SearchName') {
        this.listsearch = this.listProductWithASInactive.filter((data) =>
          data.name
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'searchID') {
        this.listsearch = this.listProductWithASInactive.filter((data) =>
          data.drugRegistrationNumber
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      }
    }

    // search for list product have inactive brand
    getListSearchBrand() {
      console.log(this.searchData);

      if (this.selectedProvince == 'searchBarcode') {
        this.listsearch = this.listProductWithBrandInactive.filter((data) =>
          data.barcode.toString().includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'SearchName') {
        this.listsearch = this.listProductWithBrandInactive.filter((data) =>
          data.name
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'searchID') {
        this.listsearch = this.listProductWithBrandInactive.filter((data) =>
          data.drugRegistrationNumber
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      }
    }

    // search for list product have inactive supplier
    getListSearchSupplier() {
      console.log(this.searchData);

      if (this.selectedProvince == 'searchBarcode') {
        this.listsearch = this.listProductWithSupplierInactive.filter((data) =>
          data.barcode.toString().includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'SearchName') {
        this.listsearch = this.listProductWithSupplierInactive.filter((data) =>
          data.name
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      } else if (this.selectedProvince == 'searchID') {
        this.listsearch = this.listProductWithSupplierInactive.filter((data) =>
          data.drugRegistrationNumber
            .toLocaleLowerCase()
            .includes(this.searchData.toLocaleLowerCase())
        );
      }
    }



  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.activeSubstanceName == '') {
      this.checkError = true;
    } else {
      var formdata = new FormData();
      formdata.append('name', this.activeSubstanceName);
      this.isVisible = false;

      this.product.createCategory(formdata).subscribe(
        (result: any) => {
          this.notification.create(
            'success',
            'Tạo phân loại thuốc mới thành công',
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
            'Tạo phân loại thuốc mới thất bại',
            ''
          );
        }
      );
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
    console.log('dashboard/detail-medicine/' + id);
  }

  changeTab(select: number){
    if(select==1){
      this.listsearch = this.listData
      this.searchData =''
    }
    else if(select==2){
      this.listsearch = this.listProductWithASInactive
      this.searchData =''
    }
    else if(select==3){
      this.listsearch = this.listProductWithSupplierInactive
      this.searchData =''
    }
    else if(select==4){
      this.listsearch = this.listProductWithBrandInactive
      this.searchData =''
    }
  }

  isInActiveProduct(id: number) {
    console.log(id);

    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho sản phẩm này ngừng hoạt động không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.ActiveProduct(id).subscribe((result) => {
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
  isActiveProduct(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho sản phẩm này hoạt động lại không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.ActiveProduct(id).subscribe((result) => {
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
