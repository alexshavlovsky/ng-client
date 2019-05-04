import {Component, OnInit} from '@angular/core';
import {NotebookModel} from '../model/notebook.model';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notebooks: NotebookModel[] = [];
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
        this.notesFetchFailed = true;
      },
      err => {
        this.toast.error('Failed to get notebooks');
        this.nbFetchFailed = true;
      }
    );
  }

}
