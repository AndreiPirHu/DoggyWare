import { Component, Input } from '@angular/core';
import { StateService } from '../../../state/state.service';
import { DataService } from '../../../data/data.service';
import { Employee } from '../../../data/employee.model';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-trainer-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-trainer-modal.component.html',
  styleUrl: './add-trainer-modal.component.css',
})
export class AddTrainerModalComponent {
  newTrainer: Employee = {
    name: '',
    phoneNumber: '',
  };

  @Input() handleAddTrainerModalToggle: () => void = () => {};
  @Input() handleSearchFilter: () => void = () => {};
  constructor(
    private stateService: StateService,
    private dataService: DataService
  ) {}

  handleAddNewTrainer = () => {
    //get current trainers from state
    let currentTrainers: Employee[] = [];
    this.stateService.employees$.subscribe((trainers: Employee[]) => {
      currentTrainers = trainers;
    });
    //format the information
    this.handleNewTrainerInformationFormatting();

    //send new trainer info to firebase
    this.dataService.addNewTrainerFirebase(currentTrainers, this.newTrainer);
    //sorts the list again to update it
    this.handleSearchFilter();
    //untoggles the modal
    this.handleAddTrainerModalToggle();
  };

  handleNewTrainerInformationFormatting = () => {
    //set the trainer name to first letter uppercase
    this.newTrainer.name =
      this.newTrainer.name[0].toUpperCase() + this.newTrainer.name.slice(1);
  };
}
