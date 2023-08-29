import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  token$: Observable<string> = this.tokenSubject$.asObservable()

  constructor(private userService: UserService) {  }

  get token(): string{
    return this.tokenSubject$.value
  }


  login(email: string, password: string): Promise<void>{
    return new Promise(
      (resolve, reject)=>{
        const user = this.userService.getByUserEmail(email)

        if(!user){
          reject('Unknown User')
          return
        }

        if(user.password === password){
          this.tokenSubject$.next('aTotallyPerfectToken')
          resolve()
        }else{
          reject("Wrong Password")
        }
      }
    )
  }

  logout(){
    this.tokenSubject$.next('')
  }

}
