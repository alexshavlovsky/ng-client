import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;
  formErrorMessage = null;
  formSubmission = false;

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
      senderName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      feedbackText: ['', Validators.required]
    });
  }

  get nameErrors() {
    return this.adaptErrors(this.form.controls.senderName, {required: 'Name is required'});
  }

  get emailErrors() {
    return this.adaptErrors(this.form.controls.senderEmail,
      {required: 'Email is required', email: 'Email must be a valid email address'});
  }

  get feedbackErrors() {
    return this.adaptErrors(this.form.controls.feedbackText, {required: 'Feedback is required'});
  }

  onSubmit(): void {
    this.formSubmission = true;
    this.api.postFeedback(this.form.value).subscribe(
      res => {
        this.formErrorMessage = null;
        this.toast.success(res.message);
        this.form.reset();
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key).setValue('');
        });
        this.formSubmission = false;
      },
      err => {
        this.formErrorMessage = err.error.message ? err.error.message : 'Failed to sign up';
        this.toast.error(this.formErrorMessage);
        this.formSubmission = false;
      }
    );
  }
}
