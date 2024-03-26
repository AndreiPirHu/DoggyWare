import { Component, OnInit } from '@angular/core';
import { Employee } from '../../data/employee.model';
import { StateService } from '../../state/state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddTrainerModalComponent } from './add-trainer-modal/add-trainer-modal.component';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [FormsModule, CommonModule, AddTrainerModalComponent],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
})
export class TrainersComponent implements OnInit {
  trainers: Employee[] = [];
  trainersList: Employee[] = [];
  addTrainerModalActive: boolean = false;
  sortingDropdownExpanded: boolean = false;
  trainersListSorting: string = '';

  searchInput: string = '';

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.stateService.employees$.subscribe((trainers: Employee[]) => {
      this.trainers = trainers ?? [];
      this.trainersList = trainers ?? [];
    });
  }

  handleTrainerPageNavigation = (name: string) => {
    this.router.navigate([`/trainers/${name}`]);
  };

  handleAddTrainerModalToggle = () => {
    this.addTrainerModalActive = !this.addTrainerModalActive;
  };

  handleSearchFilter = () => {
    if (this.searchInput.length < 3) {
      this.trainersList = this.trainers;
      this.handleListSorting(this.trainersListSorting);
    } else {
      this.trainersList = this.trainersList.filter((trainer) => {
        return Object.values(trainer).some((value) =>
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

    this.trainersListSorting = sorting;

    let sortedTrainersList = [...this.trainersList];

    if (sorting == 'Name') {
      sortedTrainersList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting == '') {
      //has to re-filter when resetting to original
      sortedTrainersList = [...this.trainers];
    }
    this.trainersList = sortedTrainersList;
  };
}
