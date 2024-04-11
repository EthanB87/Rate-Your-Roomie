import { Component } from '@angular/core';
import {SignUp} from "../../../../models/SignUp.Model";
import {Login} from "../../../../models/Login.Model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isSignUpVisible: boolean  = true;

  signUp: SignUp  = new SignUp();
  login: Login  = new Login();

  constructor(private router: Router){}


  onRegister() {
    const localUser = localStorage.getItem("accounts");
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUp);
      localStorage.setItem("accounts", JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUp);
      localStorage.setItem("accounts", JSON.stringify(users))
    }
    this.router.navigateByUrl("/add");
  }

  onLogin() {
    const localUsers =  localStorage.getItem("accounts");
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user:SignUp)=> user.email == this.login.email && user.password == this.login.password);
      if(isUserPresent != undefined) {
        localStorage.setItem("loggedUser", JSON.stringify(isUserPresent));
        this.router.navigateByUrl("/home");
      } else {
        alert("No account Found :(")
      }
    }
  }

}
