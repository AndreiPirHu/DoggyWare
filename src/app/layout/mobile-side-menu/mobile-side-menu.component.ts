import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mobile-side-menu.component.html',
  styleUrl: './mobile-side-menu.component.css',
})
export class MobileSideMenuComponent {
  sideMenuIsActive: boolean = false;

  handleSideMenuToggle = () => {
    this.sideMenuIsActive = !this.sideMenuIsActive;
  };

  handleNavigationClick = () => {
    this.handleSideMenuToggle();
  };
}
