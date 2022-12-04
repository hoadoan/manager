import { BrandsService } from 'src/app/_core/services/brands/brands.service';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActiveSubstance, Brand, routeOfAdministration, Shelf } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-update-info-medicine',
  templateUrl: './update-info-medicine.component.html',
  styleUrls: ['./update-info-medicine.component.css']
})
export class UpdateInfoMedicineComponent implements OnInit {

  @Input() productId: number = 0
  isVisibleChangeInfo: boolean = false
  isUseDose: boolean = true
  isManagedInBatches: boolean = true
  confirmModal?: NzModalRef;
  shelf: Shelf[] = []
  brand: Brand[] = []
  // activeSubstance: ActiveSubstance[] = []
  listROA: routeOfAdministration[] = [];

  updateInfoProduct = {
    drugRegistrationNumber:'',
    name: '',
    brandId: '',
    shelfId: '',
    routeOfAdministrationId:'',
    mininumInventory:'',
  }
  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
    private product: ProductService,
    private brands: BrandsService
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
    this.product.getProductById(this.productId).subscribe((result)=>{
      console.log(result.data)
      this.updateInfoProduct.drugRegistrationNumber = result.data.drugRegistrationNumber
      this.updateInfoProduct.name = result.data.name
      this.updateInfoProduct.brandId = result.data.brand.id+''
      this.updateInfoProduct.shelfId = result.data.shelf.id+''
      console.log(this.updateInfoProduct.shelfId)
      this.updateInfoProduct.routeOfAdministrationId = result.data.routeOfAdministration.id+''
      this.isManagedInBatches = result.data.isManagedInBatches
      this.isUseDose = result.data.isUseDose
      this.updateInfoProduct.mininumInventory = result.data.mininumInventory
    })
    this.product.getAllShelf().subscribe((result)=>{
      this.shelf = result.data
    })
    // this.product.getAllActiveSubstance().subscribe((result)=>{
    //   this.activeSubstance = result.data
    // })
    this.brands.getAllBrand().subscribe((result)=>{
      this.brand = result.data
    })
    this.product.getROA().subscribe((result)=>{
      this.listROA = result.data
    })
  }

  clickIsUseDose() {
    this.isUseDose == !this.isUseDose;
  }

  clickIsManagedInBatches() {
    this.isManagedInBatches == !this.isManagedInBatches;
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false

    let dataform = new FormData()
      dataform.append('drugRegistrationNumber',this.updateInfoProduct.drugRegistrationNumber)
      dataform.append('name',this.updateInfoProduct.name)
      dataform.append('brandId',this.updateInfoProduct.brandId)
      dataform.append('shelfId',this.updateInfoProduct.shelfId)
      dataform.append('mininumInventory',this.updateInfoProduct.mininumInventory)
      dataform.append('routeOfAdministrationId',this.updateInfoProduct.routeOfAdministrationId)
      dataform.append('isUseDose',this.isUseDose+'')
      dataform.append('isManagedInBatches',this.isManagedInBatches+'')
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi thông tin sản phẩm',
        nzContent: 'Bạn có muốn thay đổi thông tin sản phẩm này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.product.updateInfoProduct(this.productId, dataform).subscribe((result) => {
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
              err.error.message,
              ''
            );
          })
        }
      });
  }

  handleChangeInfoCancel() {
    this.isVisibleChangeInfo = false
  }

  changeInfo() {
    console.log(this.updateInfoProduct);

  }
}
