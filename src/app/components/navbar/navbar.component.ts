import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
  }

  logIn(){
    this._authService.logInToApp()
  }

  logOut(){
    this._authService.logOutFromApp()
    console.log("logout");
    
  }



}
