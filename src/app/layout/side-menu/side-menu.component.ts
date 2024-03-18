import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  dogs: Dog[] = [];

  constructor(
    private dataService: DataService,
    private stateService: StateService
  ) {}
  //sidemenu fetches the data when it appears
  ngOnInit(): void {
    //get the data from the database
    this.dataService.getData().subscribe((data: any) => {
      //save the data as a state
      this.stateService.setDogs(data.dogs);
      this.stateService.setEmployees(data.employees);
    });
  }
}
