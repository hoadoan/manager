import { Router } from '@angular/router';
import { UserService } from './../../../../_core/services/user/user.service';
// import { CustomValidators } from './../../../../providers/CustomValidators';
import { ImageService } from './../../../../_core/services/image/image.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref } from 'firebase/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css'],
})
export class CreateStaffComponent implements OnInit {
  path: string = '';
  nameImage: string = '';
  imageURL: string = './assets/img/avatar.png';
  isSubmit: boolean = true

  StaffData = this.fb.group({
    loginName: ['', [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),],],
    // password: ['', [Validators.required, Validators.minLength(6)]],
    // passwordConfirm: ['', [Validators.required, Validators.minLength(6)],],
    fullname: ['', [Validators.required,Validators.maxLength(100)]],
    email: ['',[Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    dob: ['', [Validators.required]],
    isMale: [true],
    avatar: ['', Validators.required],
  }, {
  });

  get statusError() {
    return this.StaffData.controls;
  }
  constructor(
    private storageImage: AngularFireStorage,
    private GetImg: ImageService,
    private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void { }

  onSubmit() {
    console.log(this.statusError);
    console.log(this.StaffData);

    var formData: any = new FormData();
    this.StaffData.value.avatar = this.imageURL;
    var date = this.StaffData.value.dob;
    formData.append('loginName', this.StaffData.value.loginName);
    // formData.append('password', this.StaffData.value.password);
    // formData.append('passwordConfirm', this.StaffData.value.passwordConfirm);
    formData.append('fullname', this.StaffData.value.fullname);
    formData.append('email', this.StaffData.value.email)
    formData.append('phoneNumber', this.StaffData.value.phoneNumber);
    formData.append('dob', date);
    formData.append('isMale', this.StaffData.value.isMale);
    formData.append('avatar', this.StaffData.value.avatar);

    this.user.createStaff(formData).subscribe((rs: any) => {
      console.log(rs);
      this.isSubmit = true
      this.notification.create(
        'success',
        'Tạo nhân viên mới thành công', ''
      )
      this.router.navigate(['dashboard/staff'])
    }, (err: { error: { message: string; }; }) => {
      console.log(err);

      this.notification.create(
        'error',
        'Không thành công',
        (err.error.message)
      )
    });
  }

  async uploadImage($event: any) {
    this.path = $event.target.files[0];
    console.log(this.path);
    await (this.nameImage = 'image' + Math.random());
    await this.storageImage.upload(this.nameImage, this.path);
    // await this.receiveURL(this.nameImage);
    const storage = getStorage();
    const pathReference = ref(storage, 'images/' + this.nameImage);
    console.log('path', pathReference);
    this.GetImg.readlink(this.nameImage).subscribe((result: any) => {
      console.log(result.downloadTokens);
      this.imageURL =
        'https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/' +
        this.nameImage +
        '?alt=media&token=' +
        result.downloadTokens;
    });
  }
}
