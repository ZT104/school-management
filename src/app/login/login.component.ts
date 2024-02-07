import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {
    const token = sessionStorage.getItem('token')
    console.log('token', token);
    if (token) {
      this.router.navigate(['/dashboard'])
    }
  }
  generateUniqueId() {     // Get current timestamp   
    const timestamp = new Date().getTime();

    // Generate a random number (between 0 and 1) and convert it to a string   
    const randomString = (Math.random() * 1e18).toString(36);
    // Combine timestamp and random string to create a unique ID   
    const uniqueId = `${timestamp}-${randomString}`;
    return uniqueId;
  }



  login() {
    this.authService.authenticate(this.username, this.password).subscribe((success) => {
      if (success) {
        const myUniqueId = this.generateUniqueId();
        sessionStorage.setItem('token', myUniqueId)
        console.log(myUniqueId);
        this.router.navigate(['/dashboard']); // Redirect to the dashboard component
      } else {
        this.loginFailed = true;
      }
    });
  }
}
