import {Component, inject, OnInit} from '@angular/core';
import {Account} from "../../../models/Account.Model";
import {Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from "@angular/common";
import {DatabaseService} from "../../../services/database.service";
import {AccountDalService} from "../../../services/account-dal.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  db = inject(DatabaseService);
  dal = inject(AccountDalService);
  router = inject(Router);
  isSignUpVisible: boolean = true;

  accountForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  refEmail = this.accountForm.controls["email"];
  refPassword = this.accountForm.controls["password"];


  ngOnInit(): void {
    this.db.initDatabase();
  }

  onRegister() {
    if (this.accountForm.valid) {
      const email = this.accountForm.get('email')?.value;
      const password = this.accountForm.get('password')?.value;
      const account = new Account(email, password);

      this.dal.insert(account)
        .then(() => {
          console.log('Account added successfully');
          this.router.navigateByUrl('/new');
        })
        .catch(e => {
          console.error('Error adding account:', e);
        });
    } else{
      alert("Please Enter a Valid Email or Password");
    }
  }

  onLogin() {
    if (this.accountForm.valid) {
      const email = this.accountForm.get('email')?.value;
      const password = this.accountForm.get('password')?.value;

      this.dal.select(email, password)
        .then(account => {
          if (account) {
            this.router.navigateByUrl('/home');
          }
        })
        .catch(e => {
          console.log('Error Getting Account', e);
          console.log("error with promise");
          alert('Invalid Email or Password');
        });
    } else {
      console.log("error with form");
      alert('Invalid Email or Password');
    }
  }
}
