import { Component, Input } from '@angular/core';
import { Dog } from '../../../data/dog.model';
import { Router } from '@angular/router';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.css',
})
export class DeleteConfirmationModalComponent {
  @Input() handleDeleteConfirmationModalToggle: () => void = () => {};

  @Input() dogs: Dog[] = [];
  @Input() dogToDelete: Dog = {
    id: '',
    name: '',
    sex: 'male',
    breed: '',
    img: '',
    present: false,
    age: 0,
    chipNumber: '',
    owner: '',
    phoneNumber: '',
  };

  constructor(private router: Router, private dataService: DataService) {}

  handleDeleteDog = () => {
    //remove from state
    const dogIndex = this.dogs.findIndex(
      (dog: Dog) => dog.chipNumber == this.dogToDelete.chipNumber
    );
    this.dogs.splice(dogIndex, 1);

    //remove from firebase
    this.dataService.removeDogFirebase(this.dogs);
    //navigate to catalogue
    this.router.navigate([`/catalogue`]);
  };
}
