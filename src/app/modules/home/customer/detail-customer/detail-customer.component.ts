import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_core/services/user/user.service';
import { InvoiceById } from 'src/app/_core/utils/interface';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css'],
})
export class DetailCustomerComponent implements OnInit {

  invoice : InvoiceById[]= []
  id: string = '';
  phoneNumber: string = '';
  fullname: string = '';
  createdAt: string = '';
  totalPoint: string = '';
  createdBy: number = 0;
  createByName: string =''
  subParam!: Subscription;

  constructor(
    private route: Router,
    private atvRoute: ActivatedRoute,
    private user: UserService
  ) {}

  detailInvoice(id : number){
    this.route.navigate(["dashboard/detail-invoice/" + id])
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.user.getCustomer(params['id']).subscribe((result) => {
          console.log(result.data);
          this.fullname = result.data?.fullName;
          this.createdAt = result.data?.createdAt;
          this.phoneNumber = result.data?.phoneNumber;
          this.totalPoint = result.data?.totalPoint;
          this.createdBy = result.data?.createdBy;
          this.user.getProfilebyID(this.createdBy).subscribe((name)=>{
            this.createByName = name.data.fullname
          })

        });
        this.user.getInvoicesByIdUser(params['id']).subscribe((invoices) => {
          console.log(invoices.data)
        this.invoice = invoices.data
        }
        );
      },
      (err) => {
        this.route.navigate(['/404']);
      }
    );
  }
}
