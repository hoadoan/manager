import { UserService } from './../../_core/services/user/user.service';
import { Profile } from './../../_core/utils/interface';
import { PROFILE, USER_NAME, AVATAR } from './../../_core/utils/configApp';
import { AuthService } from './../../_core/services/auth/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile: any = localStorage.getItem(PROFILE)
  username = localStorage.getItem(USER_NAME)
  avatar = localStorage.getItem(AVATAR);


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.user.getProfile().subscribe((result: any) => {
      // let profile = 
      console.log(result);
      
    })
  }
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    this.auth.logout();
  }
}