import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() updateStatus = new EventEmitter();
  @Output() itemDeleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  checkboxChange() {
    this.todo.done = !this.todo.done;
    this.updateStatus.emit(this.todo);
  }

  onDelete() {
    this.itemDeleteEvent.emit(this.todo.id);
  }

}
