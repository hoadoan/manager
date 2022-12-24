import { Noti, listNoti } from './../../../_core/utils/interface';
import { DashboardService } from 'src/app/_core/services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css']
})
export class DetailNotificationComponent implements OnInit {

  date: string = ''
  list: Noti[] = []
  titleNotiBatch: string =''
  listNotiBatch: listNoti[] = []
  titleNotiQuantity: string =''
  listNotiQuantity: listNoti[] = []
  subParam!: Subscription;

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private noti: DashboardService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.noti.getNotification(params['date']).subscribe((result)=>{
        console.log(result.data);
        this.date = result.data.notiDate
        this.titleNotiBatch = result.data.listNotiBatch.title
        this.listNotiBatch = result.data.listNotiBatch.listNotification
        this.titleNotiQuantity = result.data.listNotiQuantity.title
        this.listNotiQuantity = result.data.listNotiQuantity.listNotification
      })
    })
  }

  detailProduct(productId:number ,id: number){
    this.noti.PatchNotification(id).subscribe((result)=>{
      console.log(result);
    })
    this.router.navigate(['dashboard/detail-medicine/' + productId]);
  }

  detailBatch(batchId: number, id: number){
    this.noti.PatchNotification(id).subscribe((result)=>{
      console.log(result);
    })
    this.router.navigate(['dashboard/goodsreceiptnote/' + batchId]);
  }

}
