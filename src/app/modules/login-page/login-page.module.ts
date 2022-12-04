import { PagesLoginComponent } from './../../pages/pages-login/pages-login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AntdModule } from 'src/app/_core/share/antd/antd.module';

const loginRoutes: Routes = [
  {
    path: '', component: PagesLoginComponent, children: [
    ]
  }
]

@NgModule({
  declarations: [
    PagesLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    FormsModule,
    CommonModule,
    AntdModule
  ]
})
export class LoginPageModule { }
