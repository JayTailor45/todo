import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './../models/todo';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos$: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;

  constructor() {
    this._todos = new BehaviorSubject(this.getTodos());
    this.todos$ = this._todos.asObservable();
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  getTodos(): Todo[] {
    const todos = localStorage.getItem('todos');
    if(todos) {
      try {
        return JSON.parse(todos) as Todo[];
      } catch(e) {
        return [];
      }
    }
    return [];
  }

  saveTodos() {
    const stringifiedTodos = JSON.stringify(this.todos);
    localStorage.setItem('todos', stringifiedTodos);
  }

  addTodo(todoTitle: string) {
    const newTodo = ({
      id: uuidv4(),
      text: todoTitle,
      done: false,
    }) as unknown as Todo;
    this._todos.next([...this.todos, newTodo]);
    this.saveTodos();
  }

  checkTodo(todo: Todo) {
    const remainingTodos = this.todos.filter(t => t.id !== todo.id);
    this._todos.next([...remainingTodos, todo]);
    this.saveTodos();
  }

  deleteTodo(id: string) {
    const remainingTodos = this.todos.filter(t => t.id !== id);
    this._todos.next([...remainingTodos]);
    this.saveTodos();
  }

}
