import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';

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

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
