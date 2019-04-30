export class FeedbackModel {
  senderName: string;
  senderEmail: string;
  feedbackText: string;

  public constructor(init?: Partial<FeedbackModel>) {
    Object.assign(this, init);
  }
}
