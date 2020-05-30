import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMoveComponent } from './choose-move.component';

describe('ChooseMoveComponent', () => {
  let component: ChooseMoveComponent;
  let fixture: ComponentFixture<ChooseMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
