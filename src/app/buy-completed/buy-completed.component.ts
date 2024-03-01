import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-completed',
  templateUrl: './buy-completed.component.html',
  styleUrls: ['./buy-completed.component.scss'],
})
export class BuyCompletedComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  public redirectToEvents(){
    this.router.navigate(['/tabs/tab1'])
  }

}
