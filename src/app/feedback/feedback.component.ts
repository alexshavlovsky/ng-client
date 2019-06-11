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
  from: FormGroup;
  submitted = false;
  btnDisabled = false;
  submitFailed = false;

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.from = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      feedbackText: ['', Validators.required]
    });
  }

  get nameErrors() {
    const err = this.from.controls.senderName.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  get emailErrors() {
    const err = this.from.controls.senderEmail.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  get feedbackErrors() {
    const err = this.from.controls.feedbackText.errors;
    return {hasErrors: this.submitted && err !== null, errors: err};
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }
    this.btnDisabled = true;
    this.submitFailed = false;
    this.api.postFeedback(this.from.value).subscribe(
      res => {
        this.toast.success(res.message);
        this.from.setValue({senderName: '', senderEmail: '', feedbackText: ''});
        this.submitted = false;
        this.btnDisabled = false;
        this.submitFailed = false;
      },
      err => {
        if (err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Failed to send feedback');
        }
        this.btnDisabled = false;
        this.submitFailed = true;
      }
    );
  }
}
