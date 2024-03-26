import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDeleteConfirmationModalComponent } from './trainer-delete-confirmation-modal.component';

describe('TrainerDeleteConfirmationModalComponent', () => {
  let component: TrainerDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<TrainerDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerDeleteConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
