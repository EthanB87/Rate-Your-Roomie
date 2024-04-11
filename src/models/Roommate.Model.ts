export class Roommate {
  id: number | undefined;
  firstName: string;
  lastName: string;
  dob: Date;
  schoolName: string;
  email: string;

  constructor(firstName: string, lastName: string, dob: Date, schoolName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.schoolName = schoolName;
    this.email = email;
  }
}
