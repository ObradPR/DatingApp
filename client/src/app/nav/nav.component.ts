import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

// SERVICES
import { AccountService } from '../_services/account.service';

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
export class NavComponent {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

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
    this.loggedIn = false;
  }
}
