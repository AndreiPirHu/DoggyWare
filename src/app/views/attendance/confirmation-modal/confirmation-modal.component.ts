import { Component, Input, OnInit, Output } from '@angular/core';
import { Dog } from '../../../data/dog.model';
import { StateService } from '../../../state/state.service';
import { Employee } from '../../../data/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent implements OnInit {
  @Input() dogToConfirm: Dog = {
    id: '',
    name: '',
    sex: '',
    breed: '',
    img: '',
    present: false,
    age: 0,
    chipNumber: '',
    owner: '',
    phoneNumber: '',
  };
  @Input() handleConfirmationModalSign: (employeeSigning: Employee) => void =
    () => {};
  @Input() handleConfirmationModalDeactivation: () => void = () => {};

  assignedEmployees: Employee[] = [];
  unassignedEmployees: Employee[] = [];
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.employees$.subscribe((employees: Employee[]) => {
      this.unassignedEmployees = employees;
    });
  }

  handleAssignEmployee = (chosenEmployee: Employee) => {
    //if assigned has an employee, move it to unassigned and empty array
    if (this.assignedEmployees.length > 0) {
      this.unassignedEmployees.push(...this.assignedEmployees);
      this.assignedEmployees = [];
    }
    //move clicked employee to assigned and remove from unassigned
    const employeeIndex = this.unassignedEmployees.findIndex(
      (employee) => employee.name == chosenEmployee.name
    );
    if (employeeIndex !== -1) {
      this.assignedEmployees.push(this.unassignedEmployees[employeeIndex]);
      this.unassignedEmployees.splice(employeeIndex, 1);
    }
  };

  handleUnassignEmployee = () => {
    //move assigned employee to unassign and empty array
    if (this.assignedEmployees.length > 0) {
      this.unassignedEmployees.push(...this.assignedEmployees);
      this.assignedEmployees = [];
    }
  };
}
