import { Component, OnInit } from '@angular/core';
import { DogService } from '../../dog/dog.service';
import { Dog } from '../../dog/dog.model';
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
    private dogService: DogService,
    private stateService: StateService
  ) {}
  //sidemenu fetches the data when it appears
  ngOnInit(): void {
    //get the data from the database
    this.dogService.getDogs().subscribe((data: any) => {
      //save the data as a state
      this.stateService.setDogs(data.dogs);
    });
  }
}
