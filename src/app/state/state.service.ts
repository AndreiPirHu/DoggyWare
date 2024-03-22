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
    let changelogs: Changelog[] = this._changelogs.value;
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

      //---------update changelog-------------

      //creating the date format
      const currentDate = new Date();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthsOfYear = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const weekday = currentDate.getDay();
      const hour = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const formattedDate = `${daysOfWeek[weekday]} ${day} ${monthsOfYear[month]} ${hour}:${minutes} `;

      //creating the changelog object to send
      const newChangelog = {
        description: `${updatedDogs[dogIndex].name} was ${
          updatedDogs[dogIndex].present ? 'checked in' : 'checked out'
        } by ${employee.name}`,
        date: formattedDate,
        wasCheckedIn: updatedDogs[dogIndex].present,
      };

      //add the new changelog to front of the current one
      changelogs.unshift(newChangelog);

      //send the updated changelogs to firebase
      this.dataService.updateChangelogFirebase(changelogs);
    }
  }
}
