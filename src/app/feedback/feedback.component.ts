import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;
  submitFailed = false;

  constructor(private formBuilder: FormBuilder,
              private api: HttpService,
              private toast: ToastrService) {
  }

  static adaptErrors(control: AbstractControl, errDesc) {
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
    return FeedbackComponent.adaptErrors(this.form.controls.senderName, {required: 'Name is required'});
  }

  get emailErrors() {
    return FeedbackComponent.adaptErrors(this.form.controls.senderEmail,
      {required: 'Email is required', email: 'Email must be a valid email address'});
  }

  get feedbackErrors() {
    return FeedbackComponent.adaptErrors(this.form.controls.feedbackText, {required: 'Feedback is required'});
  }

  onSubmit(): void {
    this.api.postFeedback(this.form.value).subscribe(
      res => {
        this.submitFailed = false;
        this.toast.success(res.message);
        this.form.reset();
      },
      err => {
        this.submitFailed = true;
        if (err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Failed to send feedback');
        }
      }
    );
  }
}
