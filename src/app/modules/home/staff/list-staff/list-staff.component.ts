import { UserService } from './../../../../_core/services/user/user.service';
import { StaffInterface } from './../../../../_core/utils/interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {

  searchData: string = ''
  listData: StaffInterface[] = []
  listsearch: StaffInterface[] = []
  selectedProvince = 'searchID'
  loading: boolean = true;
  confirmModal?: NzModalRef;
  nameList = [
    { text: 'Hoạt động', value: true },
    { text: 'Đã bị chặn', value: false }
  ];
  nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)

  constructor(
    private user: UserService,
    private router: Router,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.user.getStaffs().subscribe((result) => {
      console.log(result.data);

      this.listData = result.data
      this.loading = false
      this.listsearch = this.listData
    })
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-staff/' + id]);
  }

  clickBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Chặn',
      nzContent: 'Bạn có muốn chặn nhân viên này không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.user.isBan(id).subscribe(() => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)

        })
      },
    });

  }

  clickUnBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bỏ chặn',
      nzContent: 'Bạn có muốn bỏ chặn nhân viên này không ?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.user.isUnBan(id).subscribe((rs: string) => {
          console.log('rs:', rs);
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)
        })
      },

    });
  }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == "searchID") {
      this.listsearch = this.listData.filter(data => data.userId.toString().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchPhone") {
      this.listsearch = this.listData.filter(data => data.phoneNumber.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.listData.filter(data => data.fullname.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }

}
