import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dog } from '../../../dog/dog.model';
import { StateService } from '../../../state/state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }

  dogSearch = () => {
    if (this.searchInput.length < 3) {
      this.searchResults = [];
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
    //timeout so blur clear effect is not instant when trying to navigate
    setTimeout(() => {
      this.searchResults = [];
    }, 200);
  };

  resultClick = (dogName: string, dogChip: string) => {
    let dogID: string = dogName + dogChip.slice(0, 2);
    console.log(dogID);
    this.router.navigate(['/' + dogID]);
  };
}
