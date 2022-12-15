import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../_core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ACCESS_TOKEN } from './../../_core/utils/configApp';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  username: string = ""
  password: string = ""
  token: string = ''
  check: boolean = true
  currentStep: number = 0

  isVisibleForgotPassword = false;
  fcmToken: any
  forgotPasswordInfo: any
  chagePasswordata = this.fb.group({
    tokeRecovery: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  get statusError() {
    return this.chagePasswordata.controls;
  }
  constructor(
    private auth: AuthService,
    private noti: NzNotificationService,
    public translate: TranslateService,
    private route: Router,
    private angularFireMessaging: AngularFireMessaging,
    private fb: FormBuilder,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang)
  }

  ngOnInit(): void {

    this.angularFireMessaging.requestToken.subscribe((token) => {
      this.fcmToken = token

    }, err => {
      console.log(err);
    })

  }

  login() {
    var formData: any = new FormData();
    formData.append(
      'username', this.username
    )
    formData.append(
      'password', this.password
    )
    formData.append('fCMToken', this.fcmToken)
    console.log(this.username + "-" + this.password + '-' + this.fcmToken)

    this.auth.login(formData).subscribe((result: any) => {
      console.log(result);

      if (result.accessToken) {
        this.token = `Bearer ${result.accessToken}`
        localStorage.setItem(ACCESS_TOKEN, this.token)
        if (localStorage.getItem(ACCESS_TOKEN)) {
          if (result.isAdmin == true) {
            this.route.navigate(['dashboard'])
            this.noti.create(
              'success',
              'Đăng nhập thành công', ''
            )
          } else {
            this.noti.create(
              'error',
              'Không hợp lệ',
              'Vui lòng sử dụng tài khoản quản lý để đăng nhập'
            )
          }
        }
      } else {
        this.noti.create(
          'error',
          'Không hợp lệ',
          'Vui lòng kiểm tra lại thông tin tài khoản và mật khẩu'
        )
      }

    })
  }
  showModal() {
    this.isVisibleForgotPassword = true
  }

  nextButton() {


    if (this.currentStep == 0) {
      console.log(this.username);

      this.auth.getTokenVerifyPassword({ userAccount: this.username }).subscribe((result) => {
        if (result) {
          console.log('ok');
          console.log(result);
          this.forgotPasswordInfo = result.data
          this.currentStep += 1
        }
      }, err => {
        this.noti.create(
          'error',
          err.error.message,
          ''
        )
      })
    }

  }
  previousButton() {
    // this.currentStep -= 1
    console.log('ok');
    console.log(this.chagePasswordata.value);

    var formdata = new FormData()
    formdata.append('userId', this.forgotPasswordInfo.userId)
    formdata.append('newPassword', this.chagePasswordata.value.newPassword + '')
    formdata.append('confirmPassword', this.chagePasswordata.value.confirmPassword + '')
    formdata.append('tokenRecovery', this.chagePasswordata.value.tokeRecovery + '')

    this.auth.resetPassword(formdata).subscribe((result) => {
      this.isVisibleForgotPassword = false
      this.noti.create(
        'success',
        result.message,
        ''
      )
    }, err => {
      this.noti.create(
        'error',
        err.error.message,
        ''
      )
    })

  }

  closeForgotPasswordModal() {
    this.isVisibleForgotPassword = false
  }

  chagePassword() {
    console.log('ok22');
  }
}
