import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dog } from '../data/dog.model';
import { Employee } from '../data/employee.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _dogs = new BehaviorSubject<Dog[]>([]);
  private _employees = new BehaviorSubject<Employee[]>([]);
  // a getter that other components can subscribe to for updates to dogs
  get dogs$() {
    return this._dogs.asObservable();
  }
  get employees$() {
    return this._employees.asObservable();
  }

  setDogs(dogs: Dog[]) {
    this._dogs.next(dogs);
  }
  setEmployees(employees: Employee[]) {
    this._employees.next(employees);
  }

  changePresence(chipNumber: string) {
    let updatedDogs = this._dogs.value;
    let dogIndex = updatedDogs.findIndex((dog) => dog.chipNumber == chipNumber);
    if (dogIndex !== -1) {
      //updates the new dog array
      updatedDogs[dogIndex].present = !updatedDogs[dogIndex].present;

      //updates dogs with the new array
      this._dogs.next(updatedDogs);
    }
  }
}
