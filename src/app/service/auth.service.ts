import { Injectable } from '@angular/core';
import { resolve } from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn : boolean = false;

  constructor() { }

  logInToApp(){
    this.isLoggedIn = true
  }

  logOutFromApp(){
    this.isLoggedIn = false
    console.log(this.isLoggedIn);
    
  }

  getStatusOfIsLoggedIn(){
    return this.isLoggedIn
  }

  isAuthenticated():Promise<boolean>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.isLoggedIn)
      }, 0);
    })
  }
}
