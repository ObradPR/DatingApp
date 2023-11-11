import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// SERVICES
import { AccountService } from './_services/account.service';

// INTERFACES
import { User } from './_interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response: any) => (this.users = response),
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');

    if (!userString) return;

    const user: User = JSON.parse(userString);

    this.accountService.setCurrentUser(user);
  }
}
