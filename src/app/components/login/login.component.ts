import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../http.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {UserResponse} from '../../model/user-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formErrorMessage = null;
  formSubmission = false;

  defaultUsers = [
    {email: 'user@example.com', password: '12345', roles: 'USER'},
    {email: 'admin@example.com', password: '12345', roles: 'ADMIN'},
    {email: 'admin2@example.com', password: '12345', roles: 'ADMIN, USER'}
  ];

  fillCredentialsIntoForm(user) {
    this.form.controls.email.setValue(user.email);
    this.form.controls.password.setValue(user.password);
  }

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService,
              private router: Router,
              private auth: AuthService) {
  }

  adaptErrors(control: AbstractControl, errDesc): string[] | null {
    return control.invalid && (control.dirty || control.touched) ?
      [...Object.getOwnPropertyNames(control.errors)].map(x => errDesc[x]) : null;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get emailErrors() {
    return this.adaptErrors(this.form.controls.email,
      {
        required: 'Email is required',
        email: 'Email must be a valid email address'
      });
  }

  get passwordErrors() {
    return this.adaptErrors(this.form.controls.password, {
      required: 'Password is required',
      minlength: 'Password must be at least 5 characters long'
    });
  }

  onSubmit(): void {
    this.formSubmission = true;
    this.api.postLogin(this.form.value).subscribe(
      res => {
        if (res.token) {
          this.formErrorMessage = null;
          this.toast.success(`You are welcome, ${res.user.firstName}!`);
          this.auth.logIn(res.token, new UserResponse(res.user));
          this.form.reset();
          Object.keys(this.form.controls).forEach(key => {
            this.form.get(key).setValue('');
          });
          this.formSubmission = false;
          this.router.navigate(['/']);
        }
      },
      err => {
        this.formErrorMessage = err.error.message ? err.error.message : 'Failed to sign in';
        this.toast.error(this.formErrorMessage);
        this.formSubmission = false;
      }
    );
  }
}
