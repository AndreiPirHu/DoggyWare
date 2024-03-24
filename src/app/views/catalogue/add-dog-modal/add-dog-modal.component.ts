import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-dog-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-dog-modal.component.html',
  styleUrl: './add-dog-modal.component.css',
})
export class AddDogModalComponent {
  @Input() handleAddDogModalToggle: () => void = () => {};
}
