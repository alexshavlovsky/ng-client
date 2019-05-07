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

  constructor(private http: HttpService,
              private toast: ToastrService) {
  }

  notebooks: NotebookModel[] = [];
  notes: NoteModel[] = [];
  page = 0;
  nbFetchFailed = false;
  notesFetchFailed = false;
  newNotebookName = 'New notebook';
  selectedNb;

  ngOnInit() {
    this.getAllNb();
  }

  // API helpers

  getAllNb() {
    this.http.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res.map(dto => new NotebookModel(dto));
        this.nbFetchFailed = false;
        if (this.notebooks.length > 0) {
          this.setSelectedNb(this.notebooks[0]);
        }
      },
      err => {
        this.toast.error('Failed to get notebooks');
        this.nbFetchFailed = true;
      }
    );
  }

  getAllNotesByNb(nbId: number) {
    this.http.getAllNotesByNotebook(nbId).subscribe(
      res => {
        if (this.selectedNb !== null && this.selectedNb.id === nbId) {
          this.notes = res.map(dto => new NoteModel(dto));
          this.notesFetchFailed = false;
        }
      },
      err => {
        if (this.selectedNb !== null && this.selectedNb.id === nbId) {
          this.toast.error('Failed to get notes');
          this.notesFetchFailed = true;
        }
      }
    );
  }

  getAllNotes() {
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

  // View callbacks

  selectNb(notebook: NotebookModel) {
    this.setSelectedNb(notebook);
  }

  createNotebook(name: string) {
    this.http.createNotebook(name).subscribe(
      res => this.notebooks.push(new NotebookModel(res)),
      err => this.toast.error('Failed to create notebook')
    );
  }

  updateNotebook(event: any, notebook: NotebookModel) {
    this.http.updateNotebook(notebook.id, event.target.value).subscribe(
      res => {
        Object.assign(notebook, new NotebookModel(res));
        event.target.value = notebook.name;
        this.toast.success('Notebook updated');
      },
      err => {
        event.target.value = notebook.name;
        this.toast.error('Failed to update notebook');
      }
    );
  }

  deleteNotebook(notebook: NotebookModel) {
    this.http.deleteNotebook(notebook.id).subscribe(
      res => {
        if (this.selectedNb === notebook) {
          this.setSelectedNb(null);
        }
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
        this.toast.success(res.message);
      },
      err => this.toast.error('Failed to delete notebook')
    );
  }

  // State

  setSelectedNb(notebook: NotebookModel) {
    if (notebook === null) {
      this.notes = [];
    } else if (this.selectedNb !== notebook) {
      this.getAllNotesByNb(notebook.id);
    }
    this.selectedNb = notebook;
  }

}
