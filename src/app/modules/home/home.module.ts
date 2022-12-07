import { NgxBarcodeModule } from '@greatcloak/ngx-barcode'
import { UsersProfileComponent } from './../../pages/users-profile/users-profile.component';
import { DetailMedicineComponent } from './medicine/medicine/detail-medicine/detail-medicine.component';
import { CreateMedicineComponent } from './medicine/medicine/create-medicine/create-medicine.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { CreateStaffComponent } from './staff/create-staff/create-staff.component';
import { ListStaffComponent } from './staff/list-staff/list-staff.component';
import { AntdModule } from 'src/app/_core/share/antd/antd.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { HomeTemplateComponent } from 'src/app/templates/home-template/home-template.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './customer/detail-customer/detail-customer.component';
import { ListMedicineComponent } from './medicine/medicine/list-medicine/list-medicine.component';
import { MedicineCategoryComponent } from './medicine/category/medicine-category/medicine-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeSearchFilterPipe } from 'src/app/_core/pipe/pipe-search-filter.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { isSubmitGuard } from 'src/app/_core/guards/isSubmit.guard';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';
import { ListActiveSubstanceComponent } from './medicine/activeSubstance/list-active-substance/list-active-substance.component';
import { ListProductOfActiveSubstanceComponent } from './medicine/activeSubstance/list-product-of-active-substance/list-product-of-active-substance.component';
import { TagInputModule } from 'ngx-chips';
import { DetailCategoryComponent } from './medicine/category/detail-category/detail-category.component';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { CreateSupplierComponent } from './supplier/create-supplier/create-supplier.component';
import { ListReceiptNoteComponent } from './medicine/goodsreceiptnote/list-receipt-note/list-receipt-note.component';
import { CreateSamplePrescriptionComponent } from './sampleprescription/create-sample-prescription/create-sample-prescription.component';
import { ListSamplePrescriptionComponent } from './sampleprescription/list-sample-prescription/list-sample-prescription.component';
import { DetailSamplePrescriptionComponent } from './sampleprescription/detail-sample-prescription/detail-sample-prescription.component';
import { DetailInvoiceComponent } from './report/detail-invoice/detail-invoice.component';
import { ReceiptNoteComponent } from './report/receipt-note/receipt-note.component';
import { InvoiceComponent } from './report/invoice/invoice.component';
import { DetailReceiptNoteComponent } from './report/detail-receipt-note/detail-receipt-note.component';
import { DetailSupplierComponent } from './supplier/detail-supplier/detail-supplier.component';
import { UpdateStaffComponent } from './staff/update-staff/update-staff.component';
import { DetailBrandComponent } from './brand/detail-brand/detail-brand.component';
import { UpdateInfoMedicineComponent } from './medicine/medicine/update-info-medicine/update-info-medicine/update-info-medicine.component';
import { UpdateActiveSubstanceComponent } from './medicine/medicine/update-activeSubstance/update-active-substance/update-active-substance.component';
import { AddProductUnitComponent } from './medicine/medicine/add-product-units/add-product-unit/add-product-unit.component';
import { DiscountComponent } from './discount/discount.component';
import { CreateDiseaseComponent } from './disease/create-disease/create-disease.component';
import { NotificationComponent } from './notification/notification.component';
import { DetailNotificationComponent } from './detail-notification/detail-notification.component';

const homeRoutes: Routes = [
  {
    path: '', component: HomeTemplateComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'staff', component: ListStaffComponent },
      { path: 'create-staff', component: CreateStaffComponent, canDeactivate: [isSubmitGuard] },
      { path: 'detail-staff/:id', component: DetailStaffComponent },
      { path: 'customer', component: ListCustomerComponent },
      { path: 'detail-customer/:id', component: DetailCustomerComponent },
      { path: 'medicine', component: ListMedicineComponent },
      { path: 'medicine-category', component: MedicineCategoryComponent },
      { path: 'create-medicine', component: CreateMedicineComponent },
      { path: 'detail-medicine/:id', component: DetailMedicineComponent },
      { path: 'user-profile', component: UsersProfileComponent },
      { path: 'brands', component: ListBrandComponent },
      { path: 'medicine-activeSubstance', component: ListActiveSubstanceComponent },
      { path: 'medicine-activeSubstance/:id', component: ListProductOfActiveSubstanceComponent},
      { path: 'detail-category/:id' , component: DetailCategoryComponent},
      { path: 'supplier',component: ListSupplierComponent},
      { path: 'create-supplier', component: CreateSupplierComponent},
      { path: 'goodsreceiptnote/:id', component: ListReceiptNoteComponent},
      { path: 'create-sample-prescription', component: CreateSamplePrescriptionComponent},
      { path: 'list-sample-prescription', component: ListSamplePrescriptionComponent},
      { path: 'detail-sample-prescription/:id', component: DetailSamplePrescriptionComponent},
      { path: 'invoice' ,component: InvoiceComponent},
      { path: 'detail-invoice/:id' , component: DetailInvoiceComponent},
      { path: 'receipt-note' , component: ReceiptNoteComponent},
      { path: 'detail-receipt-note/:id' , component: DetailReceiptNoteComponent},
      { path: 'detail-supplier/:id' , component: DetailSupplierComponent},
      { path: 'detail-brand/:id' , component: DetailBrandComponent},
      { path: 'notification' , component:NotificationComponent},
      { path: 'detail-notification/:date',component: DetailNotificationComponent}
    ]
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeTemplateComponent,
    ListStaffComponent,
    CreateStaffComponent,
    DetailStaffComponent,
    ListCustomerComponent,
    DetailCustomerComponent,
    ListMedicineComponent,
    MedicineCategoryComponent,
    DetailMedicineComponent,
    UsersProfileComponent,
    PipeSearchFilterPipe,
    ListBrandComponent,
    ListActiveSubstanceComponent,
    ListProductOfActiveSubstanceComponent,
    CreateMedicineComponent,
    DetailCategoryComponent,
    ListSupplierComponent,
    CreateSupplierComponent,
    ListReceiptNoteComponent,
    CreateSamplePrescriptionComponent,
    ListSamplePrescriptionComponent,
    DetailSamplePrescriptionComponent,
    DetailInvoiceComponent,
    ReceiptNoteComponent,
    InvoiceComponent,
    DetailReceiptNoteComponent,
    DetailSupplierComponent,
    UpdateStaffComponent,
    DetailBrandComponent,
    UpdateInfoMedicineComponent,
    UpdateActiveSubstanceComponent,
    AddProductUnitComponent,
    DiscountComponent,
    CreateDiseaseComponent,
    NotificationComponent,
    DetailNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    CommonModule,
    AntdModule,
    NgxBarcodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

  ],
  providers: [
    isSubmitGuard
  ]
})
export class HomeModule { }
