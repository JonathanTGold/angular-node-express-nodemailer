import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultFormComponent } from './fault-form.component';

describe('FaultFormComponent', () => {
  let component: FaultFormComponent;
  let fixture: ComponentFixture<FaultFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
