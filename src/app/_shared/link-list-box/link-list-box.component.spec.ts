import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListBoxComponent } from './link-list-box.component';

describe('LinkListBoxComponent', () => {
  let component: LinkListBoxComponent;
  let fixture: ComponentFixture<LinkListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
