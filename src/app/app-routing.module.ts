import { isLoginGuard } from './_core/guards/isLogin.guard';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { HomeModule } from './modules/home/home.module';

const routes: Routes = [
  { path: '', loadChildren: () => LoginPageModule },
  { path: 'login', loadChildren: () => LoginPageModule },
  { path: 'dashboard', loadChildren: () => HomeModule, canActivate: [isLoginGuard] },
  { path: '404', component: PagesError404Component },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
