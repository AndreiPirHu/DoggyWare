import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state/state.service';
import { Dog } from '../../dog/dog.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dogs: Dog[] = [];
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    //set the data in the dogs variable
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }
}
