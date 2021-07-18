import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoPopupComponent } from './add-todo-popup.component';

describe('AddTodoPopupComponent', () => {
  let component: AddTodoPopupComponent;
  let fixture: ComponentFixture<AddTodoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
