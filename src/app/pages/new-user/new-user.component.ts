import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../../../services/database.service";

@Component({
  selector: 'app-new-user',
  standalone: true,
    imports: [
        FormsModule,
        NavbarComponent,
        ReactiveFormsModule
    ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  roommate: Roommate = new Roommate("", "", "", "", "", []);
  dal = inject(RoommateDALService);
  db = inject(DatabaseService);
  fb = inject(FormBuilder);
  router = inject(Router);

  newUserForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    dob: ["", [Validators.required]],
    schoolName: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    gender: ["", [Validators.required]]
  });

  refFirst = this.newUserForm.controls["firstName"];
  refLast = this.newUserForm.controls["lastName"];
  refDob = this.newUserForm.controls["dob"];
  refSchool = this.newUserForm.controls["schoolName"];
  refGender = this.newUserForm.controls["gender"];

  constructor() {
    this.db.initDatabase();
  }

  onSubmit(): void {
    if (this.newUserForm.valid) {
      const firstName = this.newUserForm.get('firstName')?.value;
      const lastName = this.newUserForm.get('lastName')?.value;
      const dob = this.newUserForm.get('dob')?.value;
      const schoolName = this.newUserForm.get('schoolName')?.value;
      const gender = this.newUserForm.get('gender')?.value;
      const roommate = new Roommate(firstName, lastName, dob, schoolName, gender, []);
      // Insert roommate review into the database
      this.dal.insert(roommate)
        .then((data) => {
          console.log(data);
          this.router.navigateByUrl("/all");
        })
        .catch(e => {
          console.error('Error adding roommate:', e);
        });
    } else {
      alert("Please Fill Out All Form Fields");
    }
  }
}
