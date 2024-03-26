import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainerModalComponent } from './add-trainer-modal.component';

describe('AddTrainerModalComponent', () => {
  let component: AddTrainerModalComponent;
  let fixture: ComponentFixture<AddTrainerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
