import { Component } from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

}
