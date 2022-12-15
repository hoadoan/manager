import { PagesLoginComponent } from './../../pages/pages-login/pages-login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from 'src/app/_core/share/antd/antd.module';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

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
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(loginRoutes),
    FormsModule,
    CommonModule,
    AntdModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ]
})
export class LoginPageModule { }
