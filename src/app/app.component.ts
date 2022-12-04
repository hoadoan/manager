import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './_core/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admindashboard';

  check: boolean = false;

  constructor(
    private elementRef: ElementRef,
    public _router: Router,
    public translate: TranslateService,
    private bnIdle: BnNgIdleService,
    private auth: AuthService
  ) {
    translate.addLangs(['en', 'vn']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang)
    // console.log(this.translate.use(lang))
  }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res) {
        this.auth.logout();
      }
    });
  }
}
