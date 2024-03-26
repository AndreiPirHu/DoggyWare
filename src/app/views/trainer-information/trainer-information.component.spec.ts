import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInformationComponent } from './trainer-information.component';

describe('TrainerInformationComponent', () => {
  let component: TrainerInformationComponent;
  let fixture: ComponentFixture<TrainerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
