import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddTodoPopupComponent } from './components/add-todo-popup/add-todo-popup.component';
import { ConfirmDeletePopupComponent } from './components/confirm-delete-popup/confirm-delete-popup.component';
import { Todo } from './models/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(
    private todoService: TodosService,
    private dialog: MatDialog
  ) {
    this.todos$ = todoService.todos$.pipe(
      map(todos => {
        return todos.sort((a, b) => {
          const aDate = new Date(a.createdAt).getMilliseconds();
          const bDate = new Date(b.createdAt).getMilliseconds();
          return bDate - aDate;
        });
      }),
    );
  }

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo() {
    this.todoService.getTodos();
  }

  addNewTodo() {
    const ref = this.dialog.open(AddTodoPopupComponent, {
      width: '70vw',
      disableClose: true,
    });
    ref.afterClosed().subscribe((todo: string | null) => {
      if (todo) {
        this.todoService.addTodo(todo);
      }
    });
  }

  updateStatus(todo: Todo) {
    this.todoService.checkTodo(todo);
  }

  onTodoDelete(todoId: string) {
    this.dialog.open(ConfirmDeletePopupComponent)
    .afterClosed().subscribe((shouldDelete) => {
      if(shouldDelete) {
        this.todoService.deleteTodo(todoId);
      }
    });
  }
}
