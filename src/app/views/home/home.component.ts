import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state/state.service';
import { Dog } from '../../dog/dog.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  dogs: Dog[] = [];
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    //set the data in the dogs variable
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }
}
