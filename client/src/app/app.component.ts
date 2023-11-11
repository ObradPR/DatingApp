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

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');

    if (!userString) return;

    const user: User = JSON.parse(userString);

    this.accountService.setCurrentUser(user);
  }
}
