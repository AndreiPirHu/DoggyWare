import { Component, Input } from '@angular/core';
import { Employee } from '../../../data/employee.model';
import { Router } from '@angular/router';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-trainer-delete-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './trainer-delete-confirmation-modal.component.html',
  styleUrl: './trainer-delete-confirmation-modal.component.css',
})
export class TrainerDeleteConfirmationModalComponent {
  @Input() handleDeleteConfirmationModalToggle: () => void = () => {};

  @Input() trainers: Employee[] = [];
  @Input() trainerToDelete: Employee = {
    name: '',
    phoneNumber: '',
  };

  constructor(private router: Router, private dataService: DataService) {}

  handleDeleteTrainer = () => {
    //remove from state
    const trainerIndex = this.trainers.findIndex(
      (trainer: Employee) => trainer.name == this.trainerToDelete.name
    );
    this.trainers.splice(trainerIndex, 1);

    //remove from firebase
    this.dataService.removeTrainerFirebase(this.trainers);
    //navigate to catalogue
    this.router.navigate([`/trainers`]);
  };
}
