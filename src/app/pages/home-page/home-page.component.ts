import {Component, inject, OnInit} from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {NavbarComponent} from "../../partials/navbar/navbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  db = inject(DatabaseService);

  ngOnInit(): void {
    this.db.initDatabase();
  }
}
