import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsListComponent } from './ships-list.component';

describe('ShipsListComponent', () => {
  let component: ShipsListComponent;
  let fixture: ComponentFixture<ShipsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
