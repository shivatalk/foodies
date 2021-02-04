import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsidemenuComponent } from './vendorsidemenu.component';

describe('VendorsidemenuComponent', () => {
  let component: VendorsidemenuComponent;
  let fixture: ComponentFixture<VendorsidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
