import { UserService } from './../../_core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  avatar: string = '';
  fullname: string = '';
  phone: string = '';
  gender: string = '';
  email: string = '';
  createdAt: string = '';
  id: string = '';
  newPasswordData = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });
  changeProfile = this.fb.group({
    fullname: [''],
    email: [''],
  });

  get statusError() {
    return this.newPasswordData.controls;
  }

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}
  // change name and email
  onSubmitforChangeInformation() {
    this.modal.create({
      nzTitle: 'Thay đổi thông tin cá nhân',
      nzContent: 'Bạn có chắc chắn thay đổi thông tin không ?',
      nzOkText: 'Có',
      nzClosable: false,
      nzOnOk: () => {
        var newInfo: any = new FormData();
          newInfo.append('fullName', this.changeProfile.value.fullname);
          newInfo.append('email', this.changeProfile.value.email);
        console.log(newInfo);
        this.user.changeInfo(newInfo).subscribe(
          (rs: any) => {
            console.log(rs);
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
            this.notification.create('success', rs.message, '');
            this.fullname = ''
            this.email =''
          },
          (err: { error: { message: string } }) => {
            console.log(err);

            this.notification.create(
              'error',
              'Đổi thông tin không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }
  // change password
  onSubmit() {
    this.modal.create({
      nzTitle: 'Thay đổi mật khẩu',
      nzContent: 'Bạn có chắc chắn thay đổi mật khẩu không ?',
      nzOkText: 'Có',
      nzClosable: false,
      nzOnOk: () => {
        var formData: any = new FormData();
        formData.append(
          'currentPassword',
          this.newPasswordData.value.currentPassword
        );
        formData.append('newPassword', this.newPasswordData.value.newPassword);
        formData.append(
          'confirmPassword',
          this.newPasswordData.value.confirmPassword
        );
        this.user.changePassword(formData).subscribe(
          (rs: any) => {
            console.log(rs);
            this.notification.create('success', rs.message, '');
            this.newPasswordData.value.newPassword = null;
            this.newPasswordData.value.confirmPassword = null;
            this.router.navigate(['dashboard/user-profile']);
          },
          (err: { error: { message: string } }) => {
            console.log(err);
            this.notification.create(
              'error',
              'Đổi mật khẩu không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }

  createModal(): void {}

  ngOnInit(): void {
    this.user.getProfile().subscribe((result) => {
      console.log(result);
      this.avatar = result.data?.avatar;
      this.phone = result.data?.phoneNumber;
      this.fullname = result.data?.fullname;
      this.gender = result.data?.genderId;
      this.createdAt = result.data?.createdAt;
      this.id = result.data?.userId;
      this.email = result.data?.email;
    });
  }
}
