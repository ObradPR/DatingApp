import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

// SERVICES
import { AccountService } from '../_services/account.service';
import { User } from '../_interfaces/user.interface';

// INTERFACES

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      next: (user: User | null) => (this.loggedIn = !!user),
      error: (error) => console.log(error),
    });
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loggedIn = true;
      },
      error: (error: any) => console.log(error),
    });
  }

  logout(): void {
    this.accountService.logout();
    this.loggedIn = false;
  }
}
