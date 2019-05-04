export class NoteModel {
  id: number;
  title: string;
  text: string;
  notebook: number;
  lastModifiedOn: string;

  public constructor(init?: Partial<NoteModel>) {
    Object.assign(this, init);
  }
}
