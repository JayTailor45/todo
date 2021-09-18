import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.todoBackend}todos/`);
  }

  addTodo(todo: { todo: string; done: boolean }): Observable<Todo> {
    return this.http.post<Todo>(`${environment.todoBackend}todos/`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${environment.todoBackend}todos/${todo.uuid}`,
      todo
    );
  }

  deleteTodo(uuid: string): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.todoBackend}todos/${uuid}`);
  }
}
