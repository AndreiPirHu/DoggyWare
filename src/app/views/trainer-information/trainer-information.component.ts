import { Component, OnInit } from '@angular/core';
import { Employee } from '../../data/employee.model';
import { StateService } from '../../state/state.service';
import { DataService } from '../../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { TrainerDeleteConfirmationModalComponent } from './trainer-delete-confirmation-modal/trainer-delete-confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer-information',
  standalone: true,
  imports: [FormsModule, CommonModule, TrainerDeleteConfirmationModalComponent],
  templateUrl: './trainer-information.component.html',
  styleUrl: './trainer-information.component.css',
})
export class TrainerInformationComponent implements OnInit {
  trainerEditingDisabled: boolean = true;
  paramName = '';
  trainers: Employee[] = [];
  trainerDeletionModalActive: boolean = false;

  currentTrainer: Employee = {
    name: '',

    phoneNumber: '',
  };
  currentTrainerToEdit: Employee = {
    name: '',

    phoneNumber: '',
  };

  constructor(
    private stateService: StateService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //subscribe to changes in param
    this.route.paramMap.subscribe((params) => {
      this.paramName = params.get('name') ?? '';
      //runs getcurrenttrainer again on param changes
      this.getCurrentTrainer();
    });

    this.stateService.employees$.subscribe((trainers: Employee[]) => {
      this.trainers = trainers;
      this.getCurrentTrainer();
    });
  }

  getCurrentTrainer = () => {
    let trainerIndex = this.trainers.findIndex(
      (trainer: Employee) => trainer.name == this.paramName
    );
    if (trainerIndex !== -1) {
      this.currentTrainer = { ...this.trainers[trainerIndex] };
      this.currentTrainerToEdit = this.trainers[trainerIndex];
    }
  };

  handleToggleTrainerEditMode = () => {
    this.trainerEditingDisabled = !this.trainerEditingDisabled;
  };

  handleToggleOwnerEditMode = () => {
    this.trainerEditingDisabled = !this.trainerEditingDisabled;
  };

  handleCheckIfEdited = () => {
    if (
      this.currentTrainer.name !== this.currentTrainerToEdit.name ||
      this.currentTrainer.phoneNumber !== this.currentTrainerToEdit.phoneNumber
    ) {
      return false;
    } else {
      return true;
    }
  };

  handleSaveEditChanges = () => {
    this.currentTrainer = { ...this.currentTrainerToEdit };
    this.dataService.changeFirebaseTrainerInfo(this.currentTrainerToEdit);
    this.handleToggleTrainerEditMode();
  };

  handleDeleteConfirmationModalToggle = () => {
    this.trainerDeletionModalActive = !this.trainerDeletionModalActive;
  };
}
