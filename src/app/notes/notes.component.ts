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

}
