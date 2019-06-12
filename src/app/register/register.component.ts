import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  formErrorMessage = null;

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
  }

  static checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notMatch: true};
  }

  static adaptErrors(control: AbstractControl, errDesc) {
    return control.invalid && (control.dirty || control.touched) ?
      [...Object.getOwnPropertyNames(control.errors)].map(x => errDesc[x]) : null;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: RegisterComponent.checkPasswords});
  }

  get firstNameErrors() {
    return RegisterComponent.adaptErrors(this.form.controls.firstName, {required: 'First Name is required'});
  }

  get emailErrors() {
    return RegisterComponent.adaptErrors(this.form.controls.email,
      {required: 'Email is required', email: 'Email must be a valid email address'});
  }

  get passwordErrors() {
    return RegisterComponent.adaptErrors(this.form.controls.password, {required: 'Password is required'});
  }

  get confirmPasswordErrors() {
    const control = this.form.controls.confirmPassword;
    return this.form.hasError('notMatch') && (control.dirty || control.touched) ?
      ['Passwords do not match'] : null;
  }

  onSubmit(): void {
    this.api.postNewUser(this.form.value).subscribe(
      res => {
        this.formErrorMessage = null;
        this.toast.success(`You are welcome, ${res.firstName}!`);
        this.form.reset();
      },
      err => {
        this.formErrorMessage = err.error.message ? err.error.message : 'Failed to sign up';
        this.toast.error(this.formErrorMessage);
      }
    );
  }
}
