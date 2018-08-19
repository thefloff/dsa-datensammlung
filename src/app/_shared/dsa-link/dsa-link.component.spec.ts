import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsaLinkComponent } from './dsa-link.component';

describe('DsaLinkComponent', () => {
  let component: DsaLinkComponent;
  let fixture: ComponentFixture<DsaLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
