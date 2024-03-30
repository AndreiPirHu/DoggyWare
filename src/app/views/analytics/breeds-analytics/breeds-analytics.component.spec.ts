import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsAnalyticsComponent } from './breeds-analytics.component';

describe('BreedsAnalyticsComponent', () => {
  let component: BreedsAnalyticsComponent;
  let fixture: ComponentFixture<BreedsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedsAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
