import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventuresListComponent } from './adventures-list.component';

describe('AdventuresListComponent', () => {
  let component: AdventuresListComponent;
  let fixture: ComponentFixture<AdventuresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventuresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventuresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
