import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { RouterModule } from '@angular/router';
import { Employee } from '../../data/employee.model';
import { Changelog } from '../../data/changelog.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [RouterModule, SearchBarComponent, CommonModule],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css',
})
export class NavbarMenuComponent implements OnInit {
  searchBarIsActive: boolean = false;
  mobileSideMenuIsActive: boolean = false;

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

  handleSearchBarToggle = () => {
    this.searchBarIsActive = !this.searchBarIsActive;
  };
}
