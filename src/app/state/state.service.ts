import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dog } from '../data/dog.model';
import { Employee } from '../data/employee.model';
import { DataService } from '../data/data.service';
import { Changelog } from '../data/changelog.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _dogs = new BehaviorSubject<Dog[]>([]);
  private _employees = new BehaviorSubject<Employee[]>([]);
  private _changelogs = new BehaviorSubject<Changelog[]>([]);
  constructor(private dataService: DataService) {}
  // getters that other components can subscribe to for updates to dogs
  get dogs$() {
    return this._dogs.asObservable();
  }
  get employees$() {
    return this._employees.asObservable();
  }
  get changelogs$() {
    return this._changelogs.asObservable();
  }

  //functions to set the data to the state with next()

  setDogs(dogs: Dog[]) {
    this._dogs.next(dogs);
  }
  setEmployees(employees: Employee[]) {
    this._employees.next(employees);
  }
  setChangelogs(changelogs: Changelog[]) {
    this._changelogs.next(changelogs);
  }

  //functions to manipulate the data and make changes

  changePresence(chipNumber: string, employee: Employee) {
    //get the dog index based on chipNumber
    let updatedDogs = this._dogs.value;
    let dogIndex = updatedDogs.findIndex((dog) => dog.chipNumber == chipNumber);

    //checks if a dog was found
    if (dogIndex !== -1) {
      //update the right dog in the new dogs array
      updatedDogs[dogIndex].present = !updatedDogs[dogIndex].present;

      //updates dogs state with the new array
      this._dogs.next(updatedDogs);

      //update firebase dog information
      this.dataService.changeFirebaseDogInfo(updatedDogs[dogIndex]);

      //update firebase changelog
      this.dataService.updateChangelogFirebase(updatedDogs[dogIndex], employee);
    }
  }
}
