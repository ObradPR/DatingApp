import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

// INTERFACES
import { User } from '../_interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((res: User) => {
        const user = res;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');

    this.currentUserSource.next(null);
  }
}
