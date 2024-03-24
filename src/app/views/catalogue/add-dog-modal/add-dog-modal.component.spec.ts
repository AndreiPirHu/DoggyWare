import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDogModalComponent } from './add-dog-modal.component';

describe('AddDogModalComponent', () => {
  let component: AddDogModalComponent;
  let fixture: ComponentFixture<AddDogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDogModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
