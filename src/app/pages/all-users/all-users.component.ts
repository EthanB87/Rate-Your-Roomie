import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {Review} from "../../../models/Review.Model";
import {DatabaseService} from "../../../services/database.service";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  roommates: Roommate[] = [];
  selectedRoommate: Roommate = new Roommate("", "", "", "", "", []);
  dal = inject(RoommateDALService);
  db = inject(DatabaseService);
  router = inject(Router);

  navigateToReview(roommate: Roommate) {
    this.router.navigate(["/add", roommate.id]);
  }

  navigateToAllReviews(roommate: Roommate){
    this.selectedRoommate = roommate;
    this.router.navigate(["/reviews", roommate.id])
  }
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
  calculateAverageRating(roommate: Roommate, category: keyof Review): number {
    let totalRating = 0;
    let numberOfReviews = 0;

    // Iterate over the reviews of the specific roommate
    roommate.reviews.forEach((review: Review) => {
      // Check if the category exists in the review and if it's a number
      if (category in review && typeof review[category] === 'number') {
        totalRating += Number(review[category]);
        numberOfReviews++;
      }
    });

    // Calculate the average rating
    const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
    return Number(averageRating.toFixed(1));
  }
  calculateDisplayBooleans(roommate: Roommate): { petFriendly: string, smoking: string } {
    let petFriendlyCount = 0;
    let smokingCount = 0;
    let totalReviews = 0;

    // Iterate over the reviews of the roommate
    roommate.reviews.forEach((review: Review) => {
      if (review.petFriendly) {
        petFriendlyCount++;
      }
      if (review.smoking) {
        smokingCount++;
      }
    });

    totalReviews = roommate.reviews.length;

    if(totalReviews === 0){
      return {petFriendly: "", smoking: ""};
    }
    // Determine which boolean values are more common
    const petFriendly = petFriendlyCount > roommate.reviews.length / 2 ? "Pet Friendly" : "Not Pet Friendly";

    const smoking = smokingCount > roommate.reviews.length / 2 ? "Smoker" : "Non-Smoker";

    return { petFriendly, smoking };
  }
}
