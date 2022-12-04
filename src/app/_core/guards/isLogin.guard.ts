import { ACCESS_TOKEN } from './../utils/configApp';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class isLoginGuard implements CanActivate {

    //router dùng để chuyển hướng trang (giống history.push của react)
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem(ACCESS_TOKEN)) {
            return true;
        }

        alert('Đăng nhập để vào trang này !')
        this.router.navigate(['/login'])
        return false;
    }
}