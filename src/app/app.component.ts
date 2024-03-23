import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMenuComponent } from './layout/navbar-menu/navbar-menu.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarMenuComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DoggyWare';
}
