import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/_core/services/user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/_core/services/image/image.service';
import { getStorage, ref } from 'firebase/storage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {

  @Input() staffID: number = 0
  gender: boolean = true
  imageURL: string = ''
  isVisibleChangeInfo: boolean = false
  path: string = ''
  nameImage: string = ''

  updateInfo = {
    avartar: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    isMale: false
  }

  confirmModal?: NzModalRef;

  constructor(
    private GetImg: ImageService,
    private storageImage: AngularFireStorage,
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.staffID);

    this.userService.getProfilebyID(this.staffID).subscribe((result) => {
      this.updateInfo.avartar = result.data.avatar
      this.updateInfo.fullName = result.data.fullname
      this.updateInfo.dateOfBirth = result.data.dateOfBirth
      this.updateInfo.phoneNumber = result.data.phoneNumber
      this.updateInfo.isMale = result.data.isMale
    })
    console.log(this.updateInfo);
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false

    console.log(this.updateInfo);

    let dataform = new FormData()
    dataform.append('avartar', this.updateInfo.avartar),
      dataform.append('fullName', this.updateInfo.fullName),
      dataform.append('dateOfBirth', this.updateInfo.dateOfBirth),
      dataform.append('phoneNumber', this.updateInfo.phoneNumber),
      dataform.append('isMale', this.updateInfo.isMale + ''),

      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi thông tin nhân viên',
        nzContent: 'Bạn có muốn thay đổi thông tin nhân viên này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          this.userService.changeInfoStaff(this.staffID, dataform).subscribe((result) => {
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
      this.updateInfo.avartar = 'https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/' +
        this.nameImage +
        '?alt=media&token=' +
        result.downloadTokens;
    });
  }

  changeInfo() {
    console.log(this.updateInfo);

  }



}
