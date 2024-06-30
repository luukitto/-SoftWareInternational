import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      () => this.router.navigate(['']),
      err => console.error(err)
    );
  }
}
