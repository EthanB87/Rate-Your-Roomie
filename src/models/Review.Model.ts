export class Review {
  responsibility: number | null | undefined;
  cleanliness: number | null | undefined;
  friendliness: number | null | undefined;
  noise: number | null | undefined;
  petFriendly: boolean | undefined | null;
  smoking: boolean | undefined | null;

  constructor(responsibility: number | null | undefined, cleanliness: number | null | undefined, friendliness: number | null | undefined, noise: number | null | undefined,
              petFriendly: null | undefined | boolean, smoking: null | undefined | boolean) {
    this.responsibility = responsibility;
    this.cleanliness = cleanliness;
    this.friendliness = friendliness;
    this.noise = noise;
    this.petFriendly = petFriendly;
    this.smoking = smoking;
  }
}
