import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state/state.service';
import { Dog } from '../../data/dog.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dogs: Dog[] = [];
  dogsPresent: number = 0;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    //set variables to subscribe to data from dogs state
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
      this.dogsPresent = this.dogsCurrentlyPresent;
    });
  }

  get dogsCurrentlyPresent() {
    return this.dogs.filter((dog) => dog.present == true).length;
  }
}
