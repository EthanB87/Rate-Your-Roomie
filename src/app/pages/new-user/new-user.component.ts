import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
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


  onSubmit(): void {
    // Insert roommate review into the database
    this.dal.insert(this.roommate)
      .then(() => {
        console.log('Roommate added successfully');
        this.resetForm();
      })
      .catch(e => {
        console.error('Error adding roommate:', e);
      });
  }

  resetForm(): void {
    // Reset the form fields and ratings
    this.roommate = new Roommate("", "", new Date(), "", "",
      "", []);
  }
}
