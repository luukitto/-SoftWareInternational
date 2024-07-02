import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {AuthService } from "../services/auth.service";
import  {jwtDecode, JwtPayload} from 'jwt-decode'

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
      (response) => {
        const token = response.access_token;
        const decodedToken = jwtDecode<JwtPayload>(token || '') || null;
        const currentUser = { ...decodedToken, access_token: response.access_token };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigate(['']);
      },
      err => console.error(err)
    );
  }
}
