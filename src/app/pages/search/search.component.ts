import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() filterApplied = new EventEmitter<string>();

  applyFilter(filter: string) {
    this.filterApplied.emit(filter);
  }
}
