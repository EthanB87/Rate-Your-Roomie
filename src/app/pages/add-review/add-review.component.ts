import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Review} from "../../../models/Review.Model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  roommate: Roommate = new Roommate("", "", "", "", "", []);
  review: Review = new Review(1, 1, 1, 1, false, false);
  dal = inject(RoommateDALService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.roommate = data;
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  onSubmit(): void {
    // Add the review to the roommate's reviews array
    this.roommate.reviews.push(this.review);
    // Save the updated roommate data in the database
    this.dal.update(this.roommate)
      .then((data) => {
        console.log(data);
        alert("Record updated successfully");
        this.router.navigateByUrl("/all");
      })
      .catch((e) => {
        console.log(e);
      })
  }
}
