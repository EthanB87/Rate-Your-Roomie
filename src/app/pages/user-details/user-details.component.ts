import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Roommate} from "../../../models/Roommate.Model";
import {RoommateDALService} from "../../../services/roommate-dal.service";
import {NgForOf, NgIf} from "@angular/common";
import {DatabaseService} from "../../../services/database.service";
import {GeoService} from "../../../services/geo.service";
import {CameraService} from "../../../services/camera.service";

declare const H: any;
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
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


  constructor() {
    this.db.initDatabase();
    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then(roommate =>{
      this.roommate = roommate;
    }).catch(e =>{
      console.log("Error in getting Roommate", e);
    });
  }

  detailsForm = this.fb.group({
    firstName: [this.roommate.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    lastName: [this.roommate.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    dob: [this.roommate.dob, [Validators.required]],
    schoolName: [this.roommate.schoolName, [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    gender: [this.roommate.gender, [Validators.required]],
  });

  refFirst = this.detailsForm.controls["firstName"];
  refLast = this.detailsForm.controls["lastName"];
  refDob = this.detailsForm.controls["dob"];
  refSchool = this.detailsForm.controls["schoolName"];
  refGender = this.detailsForm.controls["gender"];

  updateProfile() {
    if (this.detailsForm.valid && this.lon && this.lat) {
      this.roommate.firstName =  this.detailsForm.get('firstName')?.value;
     this.roommate.lastName = this.detailsForm.get('lastName')?.value;
     this.roommate.dob = this.detailsForm.get('dob')?.value;
     this.roommate.schoolName = this.detailsForm.get('schoolName')?.value;
     this.roommate.gender = this.detailsForm.get('gender')?.value;
      // Insert roommate review into the database
      this.dal.update(this.roommate)
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

  deleteUser(){
    this.dal.delete(this.roommate)
      .then((data) =>{
        console.log(data);
        this.router.navigateByUrl("/all");
      }).catch(e => {
      console.error('Error deleting roommate:', e);
    });
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
