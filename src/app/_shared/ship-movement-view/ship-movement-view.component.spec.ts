import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMovementViewComponent } from './ship-movement-view.component';

describe('ShipMovementViewComponent', () => {
  let component: ShipMovementViewComponent;
  let fixture: ComponentFixture<ShipMovementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipMovementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipMovementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
