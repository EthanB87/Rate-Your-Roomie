import {Review} from "./Review.Model";

export class Roommate {
  id: number | undefined;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  schoolName: string;
  email: string;
  reviews: Review[];

  constructor(firstName: string, lastName: string, dob: Date, schoolName: string, email: string,
              gender: string, reviews: Review[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.schoolName = schoolName;
    this.email = email;
    this.reviews = reviews;
  }
}
