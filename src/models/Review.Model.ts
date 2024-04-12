export class Review {
  responsibility: number;
  cleanliness: number;
  friendliness: number;
  noise: number;
  petFriendly: boolean;
  smoking: boolean;

  constructor(responsibility: number, cleanliness: number,  friendliness: number, noise: number,
  petFriendly: boolean, smoking: boolean) {
    this.responsibility = responsibility;
    this.cleanliness = cleanliness;
    this.friendliness = friendliness;
    this.noise = noise;
    this.petFriendly = petFriendly;
    this.smoking = smoking;
  }
}
