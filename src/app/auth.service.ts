import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'assets/user.json'; // Adjust the path based on your project structure

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Simulate authentication using a JSON file
  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        const isAuthenticated = !!user;
        this.isAuthenticatedSubject.next(isAuthenticated);
        return isAuthenticated;
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}

