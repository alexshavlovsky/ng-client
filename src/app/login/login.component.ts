import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formErrorMessage = null;

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
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
    this.api.postLogin(this.form.value).subscribe(
      res => {
        if (res.token) {
          this.formErrorMessage = null;
          this.toast.success(`Success`);
          localStorage.setItem('token', res.token);
          this.form.reset();
          Object.keys(this.form.controls).forEach(key => {
            this.form.get(key).setValue('');
          });
        }
      },
      err => {
        this.formErrorMessage = err.error.message ? err.error.message : 'Failed to sign in';
        this.toast.error(this.formErrorMessage);
      }
    );
  }
}
