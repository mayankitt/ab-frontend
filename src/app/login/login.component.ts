import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email_id: [null, Validators.compose([
      Validators.required, Validators.email])
    ],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      alert('Thanks!');
    } else {
      alert('Unable to submit login data');
    }
  }
}
