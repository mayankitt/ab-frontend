import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RequestServerService } from '../request-server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email_id: [null, Validators.compose([
      Validators.required, Validators.email])
    ],
    password: [null, Validators.required],
  });

  token: string;

  constructor(private fb: FormBuilder,
              private authService: RequestServerService,
              private router: Router,
              private authVerify: AuthenticationService) {}

  ngOnInit() {
    if (this.authVerify.isUserAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.getAuthToken(
        this.loginForm.get('email_id').value,
        this.loginForm.get('password').value).subscribe(
          (response: any) => {
            this.token = response.token;
            if (this.token !== undefined && this.token !== null) {
              localStorage.setItem('token', this.token);
              localStorage.setItem('tokenExpiration', response.expiry);
              this.router.navigate(['/home']);
            } else {
              alert('Incorrect credentials provided');
            }
          }, error => {
            console.log(error);
            alert('Invalid credentials provided');
          }
        );
    } else {
      alert('Unable to submit login data');
    }
  }
}
