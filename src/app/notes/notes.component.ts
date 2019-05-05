import {Component, OnInit} from '@angular/core';
import {NotebookModel} from '../model/notebook.model';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';
import {NoteModel} from '../model/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notebooks: NotebookModel[] = [];
  notes: NoteModel[] = [];
  page = 0;
  nbFetchFailed = false;
  notesFetchFailed = false;

  constructor(private http: HttpService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.http.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res.map(dto => new NotebookModel(dto));
        this.nbFetchFailed = false;
      },
      err => {
        this.toast.error('Failed to get notebooks');
        this.nbFetchFailed = true;
      }
    );
    this.http.getAllNotes().subscribe(
      res => {
        this.notes = res.map(dto => new NoteModel(dto));
        this.notesFetchFailed = false;
      },
      err => {
        this.toast.error('Failed to get notes');
        this.notesFetchFailed = true;
      }
    );
  }

  createNotebook() {
    this.http.createNotebook('New notebook').subscribe(
      res => this.notebooks.push(new NotebookModel(res)),
      err => this.toast.error('Failed to create notebook')
    );
  }

  updateNotebook(notebook: NotebookModel) {
    this.http.updateNotebook(notebook.id, notebook.name).subscribe(
      res => {
        Object.assign(notebook, new NotebookModel(res));
        this.toast.success('Notebook updated');
      },
      err => this.toast.error('Failed to update notebook')
    );
  }

  deleteNotebook(notebook: NotebookModel) {
    this.http.deleteNotebook(notebook.id).subscribe(
      res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
        this.toast.success(res.message);
      },
      err => this.toast.error('Failed to delete notebook')
    );
  }
}
