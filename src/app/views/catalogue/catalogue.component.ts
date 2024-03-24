import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state/state.service';
import { Dog } from '../../data/dog.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDogModalComponent } from './add-dog-modal/add-dog-modal.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule, AddDogModalComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  dogs: Dog[] = [];
  dogsList: Dog[] = [];
  dogsIn: number = 0;
  dogsOut: number = 0;
  searchInput: string = '';
  dogsListSorting: string = '';
  sortingDropdownExpanded: boolean = false;
  addDogModalActive: boolean = false;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
      this.dogsList = dogs;
      this.dogsIn = dogs.filter((dog) => dog.present == true).length;
      this.dogsOut = dogs.filter((dog) => dog.present == false).length;
    });
  }

  handleAddDogModalToggle = () => {
    this.addDogModalActive = !this.addDogModalActive;
  };

  handleDogPageNavigation = (dogChipNumber: string) => {
    this.router.navigate([`/catalogue/${dogChipNumber}`]);
  };

  handleSearchFilter = () => {
    if (this.searchInput.length < 3) {
      this.dogsList = this.dogs;
      this.handleListSorting(this.dogsListSorting);
    } else {
      this.dogsList = this.dogsList.filter((dog) => {
        return Object.values(dog).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(this.searchInput.toLowerCase())
        );
      });
    }
  };

  handleClearSearch = () => {
    this.searchInput = '';
    this.handleSearchFilter();
  };

  handleListSorting = (sorting: string) => {
    setTimeout(() => {
      this.sortingDropdownExpanded = false;
    }, 200);

    this.dogsListSorting = sorting;

    let sortedDogsList = [...this.dogsList];

    if (sorting == 'Name') {
      sortedDogsList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting == 'Age') {
      sortedDogsList.sort((a, b) => a.age - b.age);
    } else if (sorting == 'Breed') {
      sortedDogsList.sort((a, b) => a.breed.localeCompare(b.breed));
    } else if (sorting == '') {
      //has to re-filter when resetting to original
      sortedDogsList = [...this.dogs];
    }
    this.dogsList = sortedDogsList;
  };
}
