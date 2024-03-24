import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  sortingDropdownExpanded: boolean = false;

  @Input() dropdownOptions: string[] = [];

  @Input() chosenOption: string = '';

  @Output() sendChosenOptionEvent = new EventEmitter<any>();

  handleOptionChosen = (option: string) => {
    setTimeout(() => {
      this.sortingDropdownExpanded = false;
    }, 200);

    this.chosenOption = option;

    this.sendChosenOptionEvent.emit(option);
  };
}
