import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../../../services/database.service";
import {GeoService} from "../../../services/geo.service";
import {CameraService} from "../../../services/camera.service";
import {FooterComponent} from "../../partials/footer/footer.component";

declare const H: any;
@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    FooterComponent,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  roommate: Roommate = new Roommate("", "", "", "", "",
    0, 0, "", []);
  dal = inject(RoommateDALService);
  db = inject(DatabaseService);
  fb = inject(FormBuilder);
  router = inject(Router);
  geo = inject(GeoService);
  camera = inject(CameraService);
  position: any = undefined;
  error: any = undefined;
  lat: any;
  lon: any;

  newUserForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    dob: ["", [Validators.required]],
    schoolName: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    gender: ["", [Validators.required]],
  });

  refFirst = this.newUserForm.controls["firstName"];
  refLast = this.newUserForm.controls["lastName"];
  refDob = this.newUserForm.controls["dob"];
  refSchool = this.newUserForm.controls["schoolName"];
  refGender = this.newUserForm.controls["gender"];

  constructor() {
    this.db.initDatabase();
  }

  onSubmit() {
    if (this.newUserForm.valid && this.lon && this.lat) {
      const firstName = this.newUserForm.get('firstName')?.value;
      const lastName = this.newUserForm.get('lastName')?.value;
      const dob = this.newUserForm.get('dob')?.value;
      const schoolName = this.newUserForm.get('schoolName')?.value;
      const gender = this.newUserForm.get('gender')?.value;
      const roommate = new Roommate(firstName, lastName, dob, schoolName, gender,
        this.lon, this.lat, this.roommate.pfp, []);
      // Insert roommate review into the database
      this.dal.insert(roommate)
        .then((data) => {
          console.log(data);
          this.router.navigateByUrl("/all");
        })
        .catch(e => {
          console.error('Error adding roommate:', e);
        });
    } else {
      alert("Please Fill Out All Form Fields and Location");
    }
  }

  getLocation() {
    const subscription = this.geo.getCurrentLocation().then(data => {
      console.log(data);
      this.position = data;
      // @ts-ignore
      this.lat = data.lat;
      // @ts-ignore
      this.lon = data.lon;
      this.error = ""
      this.showMap()
    }).catch(e => {
      console.log(e)
      this.error = e;
    });
  }

  public showMap() {
    console.log("showing map: ")
    document.getElementById('mapContainer')!.innerHTML = '';

    // Initialize the platform object:
    var platform = new H.service.Platform({
      'apikey': 'eLXqDntwWJTGEflnaqEP50pd0C4dutmZVmvf-ufT_e8'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lon
      }
    };

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    var icon = new H.map.Icon('assets/img/pin.png');
    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lon
    }, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }

  capturePhoto() {
    this.camera.capturePhoto().then(photoData => {
      // Store the photo data in the profilePicture property
      this.roommate.pfp = photoData;
    }).catch(e => {
      console.error('Error capturing photo:', e);
    });
  }

  uploadPhoto() {
    this.camera.loadPhotoFromLibrary().then(photoData => {
      // Store the photo data in the profilePicture property
      this.roommate.pfp = photoData;
    }).catch(e => {
      console.error('Error uploading photo:', e);
    });
  }
}
