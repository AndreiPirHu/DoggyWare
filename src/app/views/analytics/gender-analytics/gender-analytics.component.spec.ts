import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderAnalyticsComponent } from './gender-analytics.component';

describe('GenderAnalyticsComponent', () => {
  let component: GenderAnalyticsComponent;
  let fixture: ComponentFixture<GenderAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenderAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
