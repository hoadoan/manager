import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_core/services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  listNoti: any[] = []
  constructor(
    private noti: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.noti.getAllNotification().subscribe((result)=>{
      this.listNoti = result.data
    })
  }

  DetailNotification(date: string){
    this.router.navigate(['dashboard/detail-notification/' + date]);
  }
}
