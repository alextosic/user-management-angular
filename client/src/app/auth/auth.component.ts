import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cdp-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  title: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.title.subscribe((title) => {
      this.title = this.route.snapshot.firstChild?.title;
    });
  }
}
