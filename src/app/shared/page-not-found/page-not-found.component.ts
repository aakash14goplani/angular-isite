import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  private statusMessage: string = '';
  private userLoggedIn: boolean = false;

  ngOnInit() {
    this.statusMessage = this.route.snapshot.data.message;
    this.route.data.subscribe(
      (data: Data) => {
        this.statusMessage = data.message;
      }
    );

    this.authService.user.subscribe((userData) => {
      this.userLoggedIn = (!!userData) ? true : false;
    });
  }

  private redirectUser(): void {
    if (this.userLoggedIn) {
      this.router.navigate(['/project/details']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
