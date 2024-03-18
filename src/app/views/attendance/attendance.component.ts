import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';

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
  dogsIn: number = 0;
  dogsOut: number = 0;

  searchInput: string = '';

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
  }

  handleConfirmationModalActivation = (dog: Dog) => {
    this.dogToConfirm = dog;
    this.confirmationActive = true;
  };

  handleConfirmationModalDeactivation = () => {
    this.confirmationActive = false;
  };

  handleConfirmationModalSign = () => {
    this.confirmationActive = false;
    this.handleAttendanceToggle(this.dogToConfirm.chipNumber);
  };

  handleAttendanceToggle = (chipNumber: string) => {
    this.stateService.changePresence(chipNumber);
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
}
