import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntryFormComponent } from './edit-entry-form.component';

describe('EditEntryFormComponent', () => {
  let component: EditEntryFormComponent;
  let fixture: ComponentFixture<EditEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
