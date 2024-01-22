import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private router: Router,
    private authService: Auth,
  ) {}

  public logOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
