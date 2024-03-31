import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dog } from '../../data/dog.model';
import { StateService } from '../../state/state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, AfterViewChecked, OnDestroy {
  dogs: Dog[] = [];
  searchInput: string = '';
  searchResults: Dog[] = [];
  inputFieldFocused = false;

  @ViewChild('inputField') inputField: ElementRef | undefined;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.stateService.dogs$.subscribe((dogs: Dog[]) => {
      this.dogs = dogs;
    });
  }

  ngAfterViewChecked() {
    if (this.inputField && !this.inputFieldFocused) {
      this.inputField.nativeElement.focus();
      this.inputFieldFocused = true;
    }
  }

  ngOnDestroy() {
    // Reset the boolean when the component is destroyed with ngif in sidemenu

    this.inputFieldFocused = false;
  }

  dogSearch = () => {
    if (this.searchInput.length < 3) {
      this.searchResults = [];
      return;
    }
    this.searchResults = this.dogs.filter((dog) => {
      return Object.values(dog).some((value) =>
        value.toString().toLowerCase().includes(this.searchInput.toLowerCase())
      );
    });
  };

  clearSearchResults = () => {
    //timeout so blur clear effect is not instant when trying to navigate
    setTimeout(() => {
      this.searchResults = [];
    }, 200);
  };

  handleClearSearch = () => {
    this.searchInput = '';
  };

  handleResultClick = (chipNumber: string) => {
    this.router.navigate(['catalogue/' + chipNumber]);
  };
}
