import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchApplied = new EventEmitter<string>();
  searchQuery: string = "";
  onSearch() {
    this.searchApplied.emit(this.searchQuery);
  }
}
