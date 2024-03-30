import { Component, OnInit } from '@angular/core';
import { BreedsAnalyticsComponent } from './breeds-analytics/breeds-analytics.component';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { GenderAnalyticsComponent } from './gender-analytics/gender-analytics.component';
import { AgeAnalyticsComponent } from './age-analytics/age-analytics.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    BreedsAnalyticsComponent,
    GenderAnalyticsComponent,
    AgeAnalyticsComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  dogs: Dog[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }
}
