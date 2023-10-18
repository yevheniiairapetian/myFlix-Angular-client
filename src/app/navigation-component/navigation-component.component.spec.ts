import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponentComponent } from './navigation-component.component';

describe('NavigationComponentComponent', () => {
  let component: NavigationComponentComponent;
  let fixture: ComponentFixture<NavigationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponentComponent]
    });
    fixture = TestBed.createComponent(NavigationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
