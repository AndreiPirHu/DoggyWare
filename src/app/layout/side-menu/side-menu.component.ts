import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { RouterModule } from '@angular/router';
import { Employee } from '../../data/employee.model';
import { Changelog } from '../../data/changelog.model';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private stateService: StateService
  ) {}
  //sidemenu fetches the data when it appears
  async ngOnInit(): Promise<void> {
    //get the data from the database

    const data = await this.dataService.getDataFromFirebase();

    if (data) {
      this.stateService.setDogs(data.dogData);
      this.stateService.setEmployees(data.employeeData);
      this.stateService.setChangelogs(data.changelogData);
    }
  }
}
