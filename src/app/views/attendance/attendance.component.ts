import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../data/employee.model';
import { Changelog } from '../../data/changelog.model';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  dogs: Dog[] = [];
  dogsList: Dog[] = [];
  dogsListFilter: string = 'all';
  dogsListSorting: string = '';
  dogsIn: number = 0;
  dogsOut: number = 0;

  changelogs: Changelog[] = [];

  searchInput: string = '';

  changeLogExpanded: boolean = false;
  sortingDropdownExpanded: boolean = false;

  confirmationActive: boolean = false;
  dogToConfirm: Dog = {
    id: '',
    name: '',
    sex: '',
    breed: '',
    img: '',
    present: false,
    age: 0,
    chipNumber: '',
    owner: '',
    phoneNumber: '',
  };

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
      this.dogsList = dogs;
      this.handleSearchFilter();
      this.dogsIn = dogs.filter((dog) => dog.present == true).length;
      this.dogsOut = dogs.filter((dog) => dog.present == false).length;
    });

    this.stateService.changelogs$.subscribe((changelogs: Changelog[]) => {
      this.changelogs = changelogs;
    });
  }

  handleConfirmationModalActivation = (dog: Dog) => {
    this.dogToConfirm = dog;
    this.confirmationActive = true;
  };

  handleConfirmationModalDeactivation = () => {
    this.confirmationActive = false;
  };

  handleConfirmationModalSign = (employeeSigning: Employee) => {
    this.confirmationActive = false;
    this.handleAttendanceToggle(this.dogToConfirm.chipNumber, employeeSigning);
  };

  handleAttendanceToggle = (chipNumber: string, employeeSigning: Employee) => {
    this.stateService.changePresence(chipNumber, employeeSigning);
  };

  handleSearchFilter = () => {
    if (!this.searchInput) {
      this.dogsList = this.dogs;
    } else {
      this.dogsList = this.dogs.filter((dog) => {
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

  handleChangeLogExpandedToggle = () => {
    this.changeLogExpanded = !this.changeLogExpanded;
  };

  handleDogListFilter = (filter: string) => {
    this.dogsListFilter = filter;
    if (filter == 'in') {
      this.dogsList = this.dogs.filter((dog) => dog.present == true);
    } else if (filter == 'out') {
      this.dogsList = this.dogs.filter((dog) => dog.present == false);
    } else {
      this.dogsList = this.dogs;
    }
    //has to re-sort
    this.handleListSorting(this.dogsListSorting);
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
      if (this.dogsListFilter == 'in') {
        sortedDogsList = sortedDogsList.filter((dog) => dog.present == true);
      } else if (this.dogsListFilter == 'out') {
        sortedDogsList = sortedDogsList.filter((dog) => dog.present == false);
      }
    }
    this.dogsList = sortedDogsList;
  };
}
