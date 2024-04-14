import {Component, inject} from '@angular/core';
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Review} from "../../../models/Review.Model";
import {ActivatedRoute, Router} from "@angular/router";
import {FooterComponent} from "../../partials/footer/footer.component";

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  roommate: Roommate = new Roommate("", "", "", "", "",
    0, 0, "", []);
  review: Review = new Review(1, 1, 1, 1, false, false);
  dal = inject(RoommateDALService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);


  newReviewForm = this.fb.group({
    responsibility: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    cleanliness: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    friendliness: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    noise: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    petFriendly: [false, [Validators.required]],
    smoking: [false, [Validators.required]],
  });

  refResp = this.newReviewForm.controls["responsibility"];
  refClean = this.newReviewForm.controls["cleanliness"];
  refFriend = this.newReviewForm.controls["friendliness"];
  refNoise = this.newReviewForm.controls["noise"];

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

  onSubmit(){
    if(this.newReviewForm.valid){
      const responsibility = this.newReviewForm.get('responsibility')?.value;
      const cleanliness = this.newReviewForm.get('cleanliness')?.value;
      const friendliness = this.newReviewForm.get('friendliness')?.value;
      const noise = this.newReviewForm.get('noise')?.value;
      const petFriendly = this.newReviewForm.get('petFriendly')?.value;
      const smoker = this.newReviewForm.get('smoking')?.value;
      this.review = new Review(responsibility, cleanliness, friendliness, noise, petFriendly, smoker);
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
        });
    }
  }
}
