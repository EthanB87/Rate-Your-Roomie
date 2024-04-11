import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";

@Component({
  selector: 'app-add-roommate',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './add-roommate.component.html',
  styleUrl: './add-roommate.component.css'
})
export class AddRoommateComponent {

}
