import {Review} from "./Review.Model";

export class Roommate {
  id: number | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  dob: string | null | undefined;
  gender: string | null | undefined;
  schoolName: string | null | undefined;
  latitude: number;
  longitude: number;
  reviews: Review[];

  constructor(firstName: string | null | undefined, lastName: string | null | undefined, dob: string | null | undefined, schoolName: string | null | undefined,
              gender: string | null | undefined, latitude: number, longitude: number, reviews: any[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.schoolName = schoolName;
    this.latitude = latitude;
    this.longitude = longitude;
    this.reviews = reviews;
  }
}
