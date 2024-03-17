import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dog } from '../../dog/dog.model';
import { StateService } from '../../state/state.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  dogs: Dog[] = [];
  dogsIn: number = 0;
  dogsOut: number = 0;
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
      this.dogsIn = dogs.filter((dog) => dog.present == true).length;
      this.dogsOut = dogs.filter((dog) => dog.present == false).length;
    });
  }

  handleAttendanceToggle = (chipNumber: string) => {
    this.stateService.changePresence(chipNumber);
  };
}
