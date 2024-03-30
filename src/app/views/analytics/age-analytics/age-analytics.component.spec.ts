import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeAnalyticsComponent } from './age-analytics.component';

describe('AgeAnalyticsComponent', () => {
  let component: AgeAnalyticsComponent;
  let fixture: ComponentFixture<AgeAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgeAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
