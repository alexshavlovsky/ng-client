import {Component, OnInit} from '@angular/core';
import {FeedbackDTO} from '../model/FeedbackDTO';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  model: FeedbackDTO = {
    senderName: '',
    senderEmail: '',
    feedbackText: ''
  };

  constructor(private api: HttpService, private toast: ToastrService) {
  }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.api.postFeedback(this.model).subscribe(
      a => {
        this.toast.success(a.message, 'SUCCESS');
      },
      b => {
        if (b.error.error && b.error.errors) {
          this.toast.error(b.error.error, 'FAIL');
          for (const e of b.error.errors) {
            this.toast.warning(e.defaultMessage, e.field);
          }
        } else {
          this.toast.error(b.message, 'FAIL');
        }
      }
    )
    ;
  }
}
