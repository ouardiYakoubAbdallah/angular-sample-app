import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private readonly httpClient: HttpClient) {}

  private getObjectUrl(task: Task) {
    return `${this.apiUrl}/${task.id}`;
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = this.getObjectUrl(task);
    return this.httpClient.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = this.getObjectUrl(task);
    return this.httpClient.put<Task>(url, task, httpOptions);
  }
}
