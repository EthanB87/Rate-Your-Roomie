import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  roommates: Roommate[] = [];

  dal = inject(RoommateDALService);
  router = inject(Router);

  constructor() {
    this.showAll()
  }

  showAll() {
    this.dal.selectAll().then((data) => {
      this.roommates = data;
      console.log(this.roommates)
    }).catch((e) => {
      console.log(e);
      this.roommates = [];
    })
  }
  calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
