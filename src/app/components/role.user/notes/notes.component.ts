import {Component, OnInit} from '@angular/core';
import {NotebookModel} from '../../../model/notebook.model';
import {HttpService} from '../../../http.service';
import {ToastrService} from 'ngx-toastr';
import {NoteModel} from '../../../model/note.model';

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
  newNoteTitle = 'New note';
  newNoteText = 'New note text';
  selectedNb: NotebookModel = null;

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

  setSelectedNb(notebook: NotebookModel) {
    if (notebook === null) {
      this.notes = [];
    } else if (this.selectedNb !== notebook) {
      this.getAllNotesByNb(notebook.id);
    }
    this.selectedNb = notebook;
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

  createNote(name: string, title: string, nbId: number) {
    this.http.createNote(name, title, nbId).subscribe(
      res => {
        const newNote = new NoteModel(res);
        this.notes.push(newNote);
        this.addNbSize(newNote.notebookId, 1);
      },
      err => this.toast.error('Failed to create note')
    );
  }

  deleteNote(note: NoteModel) {
    this.http.deleteNote(note.id).subscribe(
      res => {
        this.addNbSize(note.notebookId, -1);
        this.notes.splice(this.notes.indexOf(note), 1);
        this.toast.success(res.message);
      },
      () => this.toast.error('Failed to delete note')
    );
  }

  addNbSize(id: number, d: number) {
    const nb = this.notebooks.find(n => n.id === id);
    if (nb !== undefined) {
      nb.size += d;
    }
  }

}
