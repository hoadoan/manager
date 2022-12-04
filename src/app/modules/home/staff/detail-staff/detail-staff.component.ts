import { UserService } from './../../../../_core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/_core/services/image/image.service';
import { getStorage, ref } from 'firebase/storage';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InvoiceById } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {

  invoices: InvoiceById[]=[]

  path: string = '';
  nameImage: string = '';
  imageURL: string = './assets/img/avatar.png';
  isVisibleChangeInfo : boolean = false
  id: number = 1
  userAccount: string =''
  avatar: string = ''
  dateOfBirth: string = ''
  phoneNumber: string = ''
  isMale: boolean = true
  fullname: string = ''
  createdAt: string = ''
  email: string =''

  newAvatar: string = ''
  newDateOfBirth: string = ''
  newPhoneNumber: string = ''
  newIsMale:  boolean = true
  newFullname: string = ''

  checkError: boolean = false
  subParam!: Subscription;

  newPassword: string = ''
  comfirmPassword: string = ''

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private atvRoute: ActivatedRoute,
    private user: UserService,
    private storageImage: AngularFireStorage,
    private GetImg: ImageService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {


    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.user.getProfilebyID(params['id']).subscribe((result) => {
        console.log(result.data)
        this.avatar = result.data?.avatar;
        this.dateOfBirth = result.data?.dateOfBirth;
        this.fullname = result.data?.fullname;
        this.isMale = result.data?.isMale;
        this.createdAt = result.data?.createdAt;
        this.phoneNumber = result.data?.phoneNumber;
        this.email = result.data?.email
        this.userAccount = result.data?.userAccount
        this.id = result.data?.userId
      })
      this.user.getInvoiceByIdStaff(params['id']).subscribe((invoice)=>{
        console.log(invoice.data)
        this.invoices = invoice.data
      })
    }, err => {
      this.route.navigate(['/404'])
    });

  }

  // change password of staff
  onSubmit(){
    this.modal.create({
      nzTitle: 'Thay đổi mật khẩu nhân viên',
      nzContent: 'Bạn có chắc chắn đặt lại mật khẩu cho nhân viên không ?',
      nzClosable: false,
      nzOnOk: () => {
        console.log(this.id)
        this.user.changePasswordforStaff(this.id).subscribe(
          (rs: any) => {
            console.log(rs);
            // this.notification.create('success', rs.message, '');
            // this.route.navigate(['dashboard/detail-staff/'+this.id])
            this.modal.success({
              nzTitle: rs.message,
              nzContent: rs.data,
              nzWidth: 550,
              nzOnOk: () => {
                let currentUrl = this.route.url;
            this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate([currentUrl]);
          console.log(currentUrl);
        });
              this.notification.create('success', rs.message, '');
            }})
          },
          (err: { error: { message: string } }) => {
            console.log(err);
            this.notification.create(
              'error',
              'Đặt lại mật khẩu không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }

  // change information of staff

  showModalChangeInfo(): void {
    this.isVisibleChangeInfo = true;
  }

  handleChangeInfoOk(){
    this.modal.create({
      nzTitle: 'Thay đổi thông tin cá nhân',
      nzContent: 'Bạn có chắc chắn thay đổi thông tin không ?',
      nzClosable: false,
      nzOnOk: () => {
        var newInfo: any = new FormData();
        newInfo.append('avatar', this.newAvatar);
        newInfo.append('fullName', this.newFullname)
        newInfo.append('dateOfBirth', this.newDateOfBirth)
        newInfo.append('phoneNumber', this.newPhoneNumber)
        newInfo.append('isMale', this.newIsMale)
        console.log(newInfo);
        this.user.changeInfoStaff(this.id,newInfo).subscribe(
          (rs) => {
            console.log(rs);
            this.notification.create('success', rs.message, '');
            let currentUrl = this.route.url;
            this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.route.navigate([currentUrl]);
              console.log(currentUrl);
            });
            this.isVisibleChangeInfo = false
          },
          (err) => {
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

  handleChangeInfoCancel(){
    this.isVisibleChangeInfo = false;
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
    this.GetImg.readlink(this.newAvatar).subscribe((result: any) => {
      console.log(result.downloadTokens);
      this.imageURL =
        'https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/' +
        this.nameImage +
        '?alt=media&token=' +
        result.downloadTokens;
    });
  }

  detailInvoice(id : number){
    this.route.navigate(['dashboard/detail-invoice/' + id])
  }

}
