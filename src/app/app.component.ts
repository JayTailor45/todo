import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddTodoPopupComponent } from './components/add-todo-popup/add-todo-popup.component';
import { Todo } from './models/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos$: Observable<Todo[]>;
  constructor(
    private todoService: TodosService,
    private dialog: MatDialog,
  ) {
    this.todos$ = todoService.todos$;
  }

  addNewTodo() {
    const ref = this.dialog.open(AddTodoPopupComponent, {
      width: '70vw',
      disableClose: true,
    });
    ref.afterClosed().subscribe((todo: string| null) => {
      if(todo) {
        this.todoService.addTodo(todo);
      }
    });
  }

  updateStatus(todo: Todo) {
    this.todoService.checkTodo(todo);
  }

  onTodoDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }
}
