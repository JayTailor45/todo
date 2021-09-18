import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './../models/todo';
import { RestApiService } from './rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;

  constructor(
    private restAPIService: RestApiService,
    private snackbar: MatSnackBar,
    ) {
    this._todos = new BehaviorSubject<Todo[]>([]);
    this.todos$ = this._todos.asObservable();
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  getTodos() {
    this.restAPIService.getTodos().subscribe(
      (todos) => {
        this.setTodos(todos);
      },
      (err) => {
        this.setTodos([]);
      }
    );
    return [];
  }

  setTodos(todos: Todo[]) {
    this._todos.next(todos);
  }

  addTodo(todoTitle: string) {
    this.restAPIService.addTodo({todo: todoTitle, done: false}).subscribe(
      (res) => {
        this._todos.next([...this.todos, res]);
      }, (error) => {
        this.snackbar.open('Something went wrong!!!', 'OK');
      }
    );
  }

  checkTodo(todo: Todo) {
    const todoToUpdate: Todo = {...todo};
    this.restAPIService.updateTodo(todoToUpdate).subscribe((res) => {
      const remainingTodos = this.todos.filter((t) => t.uuid !== todo.uuid);
      this._todos.next([...remainingTodos, todoToUpdate]);
    }, (error) => {
      this.snackbar.open('Something went wrong!!!', 'OK');
    });
  }

  deleteTodo(uuid: string) {
    this.restAPIService.deleteTodo(uuid).subscribe((res) => {
      const remainingTodos = this.todos.filter((t) => t.uuid !== uuid);
      this._todos.next([...remainingTodos]);
    }, (error) => {
      this.snackbar.open('Something went wrong!!!', 'OK');
    });
  }

}
