import { Router } from '@angular/router';
import { ProductService } from './../../_core/services/product/product.service';
import { UserService } from './../../_core/services/user/user.service';
import { Profile } from './../../_core/utils/interface';
import { PROFILE, USER_NAME, AVATAR } from './../../_core/utils/configApp';
import { AuthService } from './../../_core/services/auth/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { DashboardService } from 'src/app/_core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile: any = localStorage.getItem(PROFILE)
  username = localStorage.getItem(USER_NAME)
  avatar = localStorage.getItem(AVATAR);
  listNoti: any[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService,
    private user: UserService,
    private noti: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.getProfile().subscribe((result) => {
      // let profile =
      console.log(result);
    this.noti.getNotifications().subscribe((result)=>{
      this.listNoti = result.data
    })
    })
  }

  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    this.auth.logout();
  }
}
