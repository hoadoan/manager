import { Router } from '@angular/router';
import { PointService } from './../../../_core/services/point/point.service';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  isVisibleChangeInfo: boolean = false
  confirmModal?: NzModalRef;
  updatePoint= {
    toPoint: 0,
    toMoney: 0
  }

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private point: PointService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.point.getPoint().subscribe((result)=>{
      this.updatePoint.toPoint = result.data.toPoint
      this.updatePoint.toMoney = result.data.toMoney
    })
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi cơ chế điểm thưởng',
        nzContent: 'Bạn có muốn thay đổi cơ chế quy đổi điểm thưởng không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.point.putPoint(this.updatePoint).subscribe((result) => {
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
    console.log(this.updatePoint);
  }
}
