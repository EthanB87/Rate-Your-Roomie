import {Component, inject, OnInit} from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  roommates: Roommate[] = [];
  dal = inject(RoommateDALService);
  db = inject(DatabaseService);
  router = inject(Router);


  constructor() {
    this.db.initDatabase();
    this.showAll()
  }

  showAll() {
    this.dal.selectAll().then((data) => {
      this.roommates = data;
      console.log(this.roommates)
    }).catch((e) => {
      console.log(e);
    })
  }

  navigateToAllUsers(){
    this.router.navigateByUrl("/all");
  }

  calculateAge(dob: string | null | undefined): number {
    const today = new Date();
    // @ts-ignore
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
