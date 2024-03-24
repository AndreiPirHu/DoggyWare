import { Component, Input } from '@angular/core';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';
import { Dog } from '../../../data/dog.model';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../state/state.service';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-add-dog-modal',
  standalone: true,
  imports: [DropdownComponent, FormsModule],
  templateUrl: './add-dog-modal.component.html',
  styleUrl: './add-dog-modal.component.css',
})
export class AddDogModalComponent {
  dogSexOptions: string[] = ['male', 'female'];
  newDog: Dog = {
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

  @Input() handleAddDogModalToggle: () => void = () => {};

  constructor(
    private stateService: StateService,
    private dataService: DataService
  ) {}

  handleDogSexChosen = (chosenOption: string) => {
    this.newDog.sex = chosenOption;
  };

  handleAddNewDog = () => {
    //get current dogs from state
    let currentDogs: Dog[] = [];
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      currentDogs = dogs;
    });
    //format the information
    this.handleNewDogInformationFormatting();

    //send new dog info to state

    //send new dog info to firebase
    this.dataService.addNewDogFirebase(currentDogs, this.newDog);
  };

  handleNewDogInformationFormatting = () => {
    //set the breed to lowercase
    this.newDog.breed = this.newDog.breed.toLowerCase();
    //set chipNumber to uppercase
    this.newDog.chipNumber = this.newDog.chipNumber.toUpperCase();
    //set the id
    this.newDog.id = this.newDog.chipNumber;
    //set the dog name to first letter uppercase
    this.newDog.name =
      this.newDog.name[0].toUpperCase() + this.newDog.name.slice(1);
    //set the owner name to first letter uppercase
    this.newDog.owner =
      this.newDog.owner[0].toUpperCase() + this.newDog.owner.slice(1);
  };
}
