import {Component, OnInit} from '@angular/core';
import {FeedbackDTO} from '../model/FeedbackDTO';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedbackDTO = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor() { }

  ngOnInit() {
  }

  sendFeedback(): void {
    console.log(this.model);
  }
}
