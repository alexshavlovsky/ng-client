import {Component, OnInit} from '@angular/core';
import {FeedbackModel} from '../model/feedback.model';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  model: FeedbackModel;

  constructor(private api: HttpService, private toast: ToastrService) {
    this.model = {
      senderName: '',
      senderEmail: '',
      feedbackText: ''
    };
  }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.api.postFeedback(this.model).subscribe(
      a => {
        this.toast.success(a.message);
        this.model = {
          senderName: '',
          senderEmail: '',
          feedbackText: ''
        };
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
    )
    ;
  }
}
