import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dog } from '../../../dog/dog.model';
import { StateService } from '../../../state/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  dogs: Dog[] = [];
  searchInput: string = '';
  searchResults: Dog[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }

  dogSearch = () => {
    if (this.searchInput.length < 3) {
      return;
    }
    this.searchResults = this.dogs.filter((dog) => {
      return Object.values(dog).some((value) =>
        value.toString().toLowerCase().includes(this.searchInput.toLowerCase())
      );
    });
    console.log(this.searchResults);
  };

  clearSearch = () => {
    this.searchResults = [];
  };
}
