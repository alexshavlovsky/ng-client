export class NotebookModel {
  id: number;
  name: string;
  size: number;

  public constructor(init?: Partial<NotebookModel>) {
    Object.assign(this, init);
  }
}
