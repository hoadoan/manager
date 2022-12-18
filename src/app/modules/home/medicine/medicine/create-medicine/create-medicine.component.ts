import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { productUnitsInterface } from './medicin-model';
import { ProductService } from 'src/app/_core/services/product/product.service';
import {
  routeOfAdministration,
  ActiveSubstance,
} from './../../../../../_core/utils/interface';
import { BrandsService } from 'src/app/_core/services/brands/brands.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand, Shelf, Unit } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css'],
})
export class CreateMedicineComponent implements OnInit {
  switchValue: boolean = true;
  confirmModal?: NzModalRef;

  listActiveSubstance: ActiveSubstance[] = [];
  listBrand: Brand[] = [];
  listShelf: Shelf[] = [];
  listUnit: Unit[] = [];
  listROA: routeOfAdministration[] = [];

  header: string = 'Đơn vị tính';
  listProductUnit: productUnitsInterface[] = [];

  productData = this.fb.group({
    drugRegistrationNumber: ['', [Validators.required], [Validators.maxLength(100)]], //mã số đăng kí
    name: ['', [Validators.required],[Validators.maxLength(250)]], // tên thuốc
    brandId: ['', Validators.required], // mã nhà sản xuất
    shelfId: ['', Validators.required], // mã kệ thuốc
    mininumInventory: ['', [Validators.required],[Validators.min(1)],[Validators.max(100000)]], //mức tồn kho tối thiểu
    routeOfAdministrationId: ['', Validators.required], // đường dùng
    // bán theo liều
    isManagedInBatches: [false], // quản lý theo lô, hạn sử dụng
    activeSubstances: [[]], // hoạt chất
    unit: ['', Validators.required], // đơn vị cơ sở
    price: ['', Validators.required], // giá bán
    productUnits: [this.listProductUnit],
    isUseDose: [false],
    doseUnitPrice: {
      doseUnit: '',
      conversionValue: 0,
    },
  });

  get statusError() {
    return this.productData.controls;
  }

  constructor(
    private fb: FormBuilder,
    private brand: BrandsService,
    private product: ProductService,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.brand.getAllBrandActive().subscribe((listBrand) => {
      console.log(listBrand);
      this.listBrand = listBrand.data;
    });
    this.product.getAllShelfActive().subscribe((listShelf) => {
      console.log(listShelf);
      this.listShelf = listShelf.data;
    });
    this.product.getROA().subscribe((listROA) => {
      console.log(listROA);
      this.listROA = listROA.data;
    });
    this.product
      .getAllActiveSubstanceActive()
      .subscribe((listActiveSubstance) => {
        console.log(listActiveSubstance);
        this.listActiveSubstance = listActiveSubstance.data;
      });
  }

  clickIsUseDose() {
    this.productData.value.isUseDose = !this.productData.value.isUseDose;

    if (this.productData.value.isUseDose == true) {
      this.productData.value.doseUnitPrice = {
        doseUnit: 'mg',
        conversionValue: 0,
      };
    } else {
      this.productData.value.doseUnitPrice = null;
    }
  }
  changeDoseUnit(event: any) {
    let name = event.target.name;
    let value = event.target.value;

    if (this.productData.value.doseUnitPrice != null) {
      let tempConversion =
        this.productData.value.doseUnitPrice?.conversionValue;
      let tempUnit = this.productData.value.doseUnitPrice?.doseUnit;
      if (name == 'conversionValue') {
        this.productData.value.doseUnitPrice = {
          doseUnit: tempUnit,
          conversionValue: value,
        };
      } else if (name == 'doseUnit') {
        this.productData.value.doseUnitPrice = {
          doseUnit: value,
          conversionValue: tempConversion,
        };
      }
    }
    console.log(this.productData.value);
  }

  clickIsManagedInBatches() {
    this.productData.value.isManagedInBatches =
      !this.productData.value.isManagedInBatches;
  }

  onSubmit() {
    console.log(this.productData.value);
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Tạo sản phẩm',
      nzContent: 'Bạn có muốn tạo sản phẩm không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.product.createProduct(this.productData.value).subscribe(
          (rs: any) => {
            console.log(rs);
            this.notification.create(
              'success',
              'Tạo sản phẩm mới thành công',
              ''
            );
            this.router.navigate(['dashboard/medicine']);
          },
          (err: { error: { message: any } }) => {
            console.log(err);

            this.notification.create(
              'error',
              'Tạo sản phẩm không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }

  addNewProductUnit() {
    this.listProductUnit.push({
      unit: '',
      conversionValue: 0, // giá trị quy đổi
      price: 0,
    });
  }

  removeProductUnit(index: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Cảnh báo',
      nzContent: 'bạn muốn xóa đơn vị sản phẩm này',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.listProductUnit.splice(index, 1);
      },
    });
  }

  Numbers(num: any) {
    return Number(num);
  }

  changeModel(event: any, index: number) {
    let name = event.target.name;
    let value = event.target.value;

    if (name == 'unit') {
      this.listProductUnit[index].unit = value;
    } else if (name == 'conversionValue') {
      this.listProductUnit[index].conversionValue = value;
      this.listProductUnit[index].price =
        value * Number(this.productData.value.price);
    } else if (name == 'price') {
      this.listProductUnit[index].price = value;
    }

    console.log(this.listProductUnit);
    console.log(this.productData.value);
  }
}
