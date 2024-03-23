import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSideMenuComponent } from './mobile-side-menu.component';

describe('MobileSideMenuComponent', () => {
  let component: MobileSideMenuComponent;
  let fixture: ComponentFixture<MobileSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSideMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
