import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolinearComponent } from './nolinear.component';

describe('NolinearComponent', () => {
  let component: NolinearComponent;
  let fixture: ComponentFixture<NolinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolinearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NolinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
