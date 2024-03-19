import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { RouterModule } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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
  firestore: Firestore = inject(Firestore);

  constructor(
    private dataService: DataService,
    private stateService: StateService
  ) {}
  //sidemenu fetches the data when it appears
  ngOnInit(): void {
    //get the data from the database
    this.dataService.getData().subscribe((data: any) => {
      //save the data as a state
      this.dogs = data.dogs;
      this.employees = data.employees;
      this.stateService.setDogs(data.dogs);
      this.stateService.setEmployees(data.employees);
    });
  }
  /*
  testFirestore = (dogs: Dog[]) => {
    for (let dog of dogs)
      addDoc(collection(this.firestore, 'dogs'), {
        id: dog.id,
        name: dog.name,
        sex: dog.sex,
        breed: dog.breed,
        img: dog.img,
        present: dog.present,
        age: dog.age,
        chipNumber: dog.chipNumber,
        owner: dog.owner,
        phoneNumber: dog.phoneNumber,
      });
  };
  */
}
