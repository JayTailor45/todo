import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-popup',
  templateUrl: './add-todo-popup.component.html',
  styleUrls: ['./add-todo-popup.component.scss']
})
export class AddTodoPopupComponent implements OnInit {

  todoFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
