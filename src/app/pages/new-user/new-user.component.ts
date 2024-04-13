import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";

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
  roommate: Roommate = new Roommate("", "", new Date(),"", "",
    "", []);
  dal = inject(RoommateDALService);
  fb = inject(FormBuilder);

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

  onSubmit(): void {
    if(this.newUserForm.valid){
      // Insert roommate review into the database
      this.dal.insert(this.roommate)
        .then(() => {
          console.log('Roommate added successfully');
          this.resetForm();
        })
        .catch(e => {
          console.error('Error adding roommate:', e);
        });
    } else{
      alert("Please Fill Out All Form Fields");
    }
  }

  resetForm(): void {
    // Reset the form fields and ratings
    this.roommate = new Roommate("", "", new Date(), "", "",
      "", []);
  }
}
