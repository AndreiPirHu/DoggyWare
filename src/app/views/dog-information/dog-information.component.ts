import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state/state.service';
import { Dog } from '../../data/dog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DataService } from '../../data/data.service';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-dog-information',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './dog-information.component.html',
  styleUrl: './dog-information.component.css',
})
export class DogInformationComponent implements OnInit {
  dogEditingDisabled: boolean = true;
  ownerEditingDisabled: boolean = true;
  paramChipNumber = '';
  dogs: Dog[] = [];
  ownerDogs: Dog[] = [];
  dogDeletionModalActive: boolean = false;

  dropdownOptions: string[] = ['female', 'male'];
  chosenOption: string = '';

  currentDog: Dog = {
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
  currentDogToEdit: Dog = {
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

  constructor(
    private stateService: StateService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //subscribe to changes in param
    this.route.paramMap.subscribe((params) => {
      this.paramChipNumber = params.get('dogChipNumber') ?? '';
      this.getCurrentDog();
      this.getOwnerDogs();
    });

    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
      this.getCurrentDog();
      this.getOwnerDogs();
    });
  }

  getCurrentDog = () => {
    let dogIndex = this.dogs.findIndex(
      (dog: Dog) => dog.chipNumber == this.paramChipNumber
    );
    if (dogIndex !== -1) {
      this.currentDog = { ...this.dogs[dogIndex] };
      this.currentDogToEdit = this.dogs[dogIndex];
      this.chosenOption = this.currentDogToEdit.sex;
    }
  };

  getOwnerDogs = () => {
    this.ownerDogs = this.dogs.filter(
      (dog: Dog) => dog.owner == this.currentDog.owner
    );
  };

  handleToggleDogEditMode = () => {
    this.dogEditingDisabled = !this.dogEditingDisabled;
  };

  handleToggleOwnerEditMode = () => {
    this.ownerEditingDisabled = !this.ownerEditingDisabled;
  };

  handleCheckIfEdited = () => {
    if (
      this.currentDog.name !== this.currentDogToEdit.name ||
      this.currentDog.age !== this.currentDogToEdit.age ||
      this.currentDog.breed !== this.currentDogToEdit.breed ||
      this.currentDog.img !== this.currentDogToEdit.img ||
      this.currentDog.sex !== this.currentDogToEdit.sex ||
      this.currentDog.owner !== this.currentDogToEdit.owner ||
      this.currentDog.phoneNumber !== this.currentDogToEdit.phoneNumber
    ) {
      return false;
    } else {
      return true;
    }
  };

  handleGenderChanged = (chosenGender: string) => {
    this.currentDogToEdit.sex = chosenGender;
  };

  handleSaveEditChanges = () => {
    this.currentDog = { ...this.currentDogToEdit };
    this.dataService.changeFirebaseDogInfo(this.currentDogToEdit);
    this.handleToggleDogEditMode();
  };

  handleDogPageNavigation = (dogChipNumber: string) => {
    this.router.navigate([`/catalogue/${dogChipNumber}`]);
  };

  handleDeleteConfirmationModalToggle = () => {
    this.dogDeletionModalActive = !this.dogDeletionModalActive;
  };
}
