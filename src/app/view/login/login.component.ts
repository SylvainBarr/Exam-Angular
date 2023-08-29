import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errMsg?: string

  constructor(private router: Router, private authService: AuthService) {
  }

  onSubmitAuthForm(loginForm: NgForm){
    if(loginForm.valid){
      const {email, password} = loginForm.value

      this.authService
        .login(email, password)
        .then(() => this.router.navigateByUrl('/characters'))
        .catch((errMsg: string)=> this.errMsg = errMsg)
    }
  }


}
