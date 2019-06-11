import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
  }

  form: FormGroup;

  submitted = false;
  btnDisabled = false;
  submitFailed = false;

  static checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
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
    const err = this.form.controls.firstName.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  get emailErrors() {
    const err = this.form.controls.email.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  get passwordErrors() {
    const err = this.form.controls.password.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  get confirmPasswordErrors() {
    const err = this.submitted && this.form.hasError('notSame');
    return {hasErrors: err};
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.btnDisabled = true;
    this.submitFailed = false;
    this.api.postNewUser(this.form.value).subscribe(
      res => {
        this.toast.success('You are welcome, ' + res.firstName + ' ' + res.lastName);
        this.form.setValue({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
        this.submitted = false;
        this.btnDisabled = false;
        this.submitFailed = false;
      },
      err => {
        if (err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Failed to sign up');
        }
        this.btnDisabled = false;
        this.submitFailed = true;
      }
    );
  }
}
