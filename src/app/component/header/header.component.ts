import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  token$!: Observable<string>

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.token$ = this.authService.token$
  }

  onClickLogout(){
    this.authService.logout()
    this.router.navigateByUrl('/characters')
  }
}
