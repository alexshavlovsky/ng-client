export class NotebookModel {
  id: number;
  name: string;
  size: string;

  public constructor(init?: Partial<NotebookModel>) {
    Object.assign(this, init);
  }
}
