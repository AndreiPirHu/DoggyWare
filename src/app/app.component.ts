import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DoggyWare';
}
