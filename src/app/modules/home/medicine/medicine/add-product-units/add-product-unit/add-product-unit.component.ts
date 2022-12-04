import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from 'src/app/_core/services/product/product.service';

@Component({
  selector: 'app-add-product-unit',
  templateUrl: './add-product-unit.component.html',
  styleUrls: ['./add-product-unit.component.css']
})
export class AddProductUnitComponent implements OnInit {

  @Input() productId: number = 0
  checkErrorUnit: boolean = false
  checkErrorConversionValue: boolean = false
  checkErrorPrice: boolean = false
  productUnitData = this.fb.group({
    productId : [''],
    unit: ['',[Validators.required]],
    conversionValue:['',[Validators.required]],
    price:['',[Validators.required]]
  });

  isVisibleChangeInfo:boolean = false
  confirmModal?: NzModalRef;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
    private product: ProductService,
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
  }


  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  checkUnit(){
    this.checkErrorConversionValue = false
    this.checkErrorUnit = true
    this.checkErrorPrice = false
  }

  handleChangeInfoOk() {
    if(this.productUnitData.value.unit == ''){
      this.checkUnit()
    }
    else if(this.productUnitData.value.conversionValue == ''){
      this.checkErrorConversionValue = true
      this.checkErrorUnit = false
      this.checkErrorPrice = false
    }else if(this.productUnitData.value.price == ''){
      this.checkErrorConversionValue = false
      this.checkErrorUnit = false
      this.checkErrorPrice = true
    }else{
      this.checkErrorConversionValue = false
      this.checkErrorUnit = false
      this.checkErrorPrice = false
      this.isVisibleChangeInfo = false
      this.productUnitData.value.productId = this.productId+''
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thêm đơn vị bán mới',
        nzContent: 'Bạn có muốn thêm đơn vị bán mới cho sản phẩm này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.product.addProductUnit(this.productUnitData.value).subscribe((result) => {
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
              err.message,
              ''
            );
          })
        }
      });
    }
  }

  handleChangeInfoCancel() {
    this.isVisibleChangeInfo = false
  }

  changeInfo() {
    console.log(this.productUnitData.value);

  }
}
