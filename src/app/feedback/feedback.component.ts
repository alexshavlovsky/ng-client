import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  submitted = false;
  btnDisabled = false;
  submitFailed = false;

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      feedbackText: ['', Validators.required]
    });
  }

  get nameErrors() {
    const err = this.feedbackForm.controls.senderName.errors;
    return {hasErrors: this.submitted && err, errors: err};
  }

  get emailErrors() {
    const err = this.feedbackForm.controls.senderEmail.errors;
    return {hasErrors: this.submitted && err, errors: err};
  }

  get feedbackErrors() {
    const err = this.feedbackForm.controls.feedbackText.errors;
    return {hasErrors: this.submitted && err, errors: err};
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
    }
    this.btnDisabled = true;
    this.submitFailed = false;
    this.api.postFeedback(this.feedbackForm.value).subscribe(
      res => {
        this.toast.success(res.message);
        this.feedbackForm.setValue({senderName: '', senderEmail: '', feedbackText: ''});
        this.submitted = false;
        this.btnDisabled = false;
        this.submitFailed = false;
      },
      err => {
        if (err.error.error && err.error.errors) {
          this.toast.error(err.error.error);
          for (const e of err.error.errors) {
            this.toast.warning(e.defaultMessage, e.field);
          }
        } else {
          this.toast.error('Failed to send feedback');
        }
        this.btnDisabled = false;
        this.submitFailed = true;
      }
    );
  }
}
