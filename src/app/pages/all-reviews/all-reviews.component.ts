import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {Review} from "../../../models/Review.Model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-reviews',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './all-reviews.component.html',
  styleUrl: './all-reviews.component.css'
})
export class AllReviewsComponent {
  roommate: Roommate | undefined;
  reviews: Review[] = [];
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dal = inject(RoommateDALService);

  constructor() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then(roommate =>{
      this.roommate = roommate;
      // @ts-ignore
      this.reviews = this.roommate.reviews;
    }).catch(e =>{
      console.log("Error in getting Reviews", e);
    });
  }

  navigateToReview(roommate: Roommate | undefined) {
    // @ts-ignore
    this.router.navigate(["/add", roommate.id]);
  }

}


