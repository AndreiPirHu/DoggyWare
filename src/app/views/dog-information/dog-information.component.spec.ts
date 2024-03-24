import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogInformationComponent } from './dog-information.component';

describe('DogInformationComponent', () => {
  let component: DogInformationComponent;
  let fixture: ComponentFixture<DogInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
