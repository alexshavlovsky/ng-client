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

  constructor(private formBuilder: FormBuilder, private api: HttpService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      feedbackText: ['', Validators.required]
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
    }
    this.api.postFeedback(this.feedbackForm.value).subscribe(
      a => {
        this.toast.success(a.message);
        this.feedbackForm.setValue({senderName: '', senderEmail: '', feedbackText: ''});
        this.submitted = false;
      },
      b => {
        // TODO: move this logic to the server side???
        if (b.error.error && b.error.errors) {
          this.toast.error(b.error.error);
          for (const e of b.error.errors) {
            this.toast.warning(e.defaultMessage, e.field);
          }
        } else {
          this.toast.error(b.message);
        }
      }
    );
  }
}
