import {Component, OnInit} from '@angular/core';
import {FeedbackDTO} from '../model/FeedbackDTO';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  model: FeedbackDTO = {
    senderName: '',
    senderEmail: '',
    feedbackText: ''
  };

  constructor(private api: HttpService) { }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.api.postFeedback(this.model).subscribe(
      (a) => {console.log(a); },
      (b) => {console.log(b); }
    );
  }
}
