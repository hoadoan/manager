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
        this.date = result.data[0].notiDate
        this.titleNotiBatch = result.data[0].listNotiBatch.title
        this.listNotiBatch = result.data[0].listNotiBatch.listNotification
        this.titleNotiQuantity = result.data[0].listNotiQuantity.title
        this.listNotiQuantity = result.data[0].listNotiQuantity.listNotification
      })
    })
  }

  detailProduct(id: number){
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  detailBatch(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }

}
