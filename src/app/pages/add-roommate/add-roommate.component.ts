import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {NavbarComponent} from "../../partials/navbar/navbar.component";

@Component({
  selector: 'app-add-roommate',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NavbarComponent
  ],
  templateUrl: './add-roommate.component.html',
  styleUrl: './add-roommate.component.css'
})
export class AddRoommateComponent {
  roommate: Roommate = new Roommate("", "", new Date(), "",
    "");

  dal = inject(RoommateDALService);
  constructor(private roommateDALService: RoommateDALService) {}

  onSubmit(): void {
    // Insert roommate review into the database
    this.dal.insert(this.roommate)
      .then(() => {
        console.log('Roommate review added successfully');
        // Optionally, you can reset the form fields here
        this.resetForm();
      })
      .catch(error => {
        console.error('Error adding roommate review:', error);
      });
  }

  resetForm(): void {
    // Reset the form fields and ratings
    this.roommate = new Roommate("", "", new Date(),"",
      "");
  }
}
