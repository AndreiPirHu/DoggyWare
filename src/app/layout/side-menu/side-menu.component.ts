import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { RouterModule } from '@angular/router';
import { Employee } from '../../data/employee.model';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  dogs: Dog[] = [];
  employees: Employee[] = [];

  constructor(
    private dataService: DataService,
    private stateService: StateService
  ) {}
  //sidemenu fetches the data when it appears
  ngOnInit(): void {
    //get the data from the database
    //get dogs and pass to state
    const data$ = this.dataService.getDataFromFirebase();
    data$.dogs.subscribe((dogsData: any) => {
      this.dogs = dogsData;
      this.stateService.setDogs(dogsData);
    });
    //get employees and pass to state
    data$.employees.subscribe((employeesData: any) => {
      this.employees = employeesData;
      this.stateService.setEmployees(employeesData);
    });
    //get changelogs and pass to state
    data$.changelogs.subscribe((changelogs: any) => {
      this.stateService.setChangelogs(changelogs);
    });
  }
}
