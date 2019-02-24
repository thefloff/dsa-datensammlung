import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListBoxComponent } from './detail-list-box.component';

describe('DetailListBoxComponent', () => {
  let component: DetailListBoxComponent;
  let fixture: ComponentFixture<DetailListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
