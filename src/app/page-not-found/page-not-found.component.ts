import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private statusMessage: string = '';

  ngOnInit() {
    this.statusMessage = this.route.snapshot.data.message;
    this.route.data.subscribe(
      (data: Data) => {
        this.statusMessage = data.message;
      }
    );
  }

}
