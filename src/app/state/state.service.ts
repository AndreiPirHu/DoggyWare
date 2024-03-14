import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dog } from '../dog/dog.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _dogs = new BehaviorSubject<Dog[]>([]);

  // a getter that other components can subscribe to for updates to dogs
  get dogs$() {
    return this._dogs.asObservable();
  }

  setDogs(dogs: Dog[]) {
    this._dogs.next(dogs);
  }
}
