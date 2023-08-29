import { Injectable } from '@angular/core';
import {User} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User
  constructor() {
    this.user = User.generateAdminUser()
  }

  getByUserEmail(email: string): User|undefined{
    return (this.user.email === email)? this.user : undefined
  }

}
