import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFunctionsComponent } from './basic-functions.component';

describe('BasicFunctionsComponent', () => {
  let component: BasicFunctionsComponent;
  let fixture: ComponentFixture<BasicFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
