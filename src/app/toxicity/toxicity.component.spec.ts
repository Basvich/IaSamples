import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityComponent } from './toxicity.component';

describe('ToxicityComponent', () => {
  let component: ToxicityComponent;
  let fixture: ComponentFixture<ToxicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToxicityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
