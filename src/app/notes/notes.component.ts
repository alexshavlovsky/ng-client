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

  constructor(private http: HttpService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.http.getAllNotebooks().subscribe(
      res => this.notebooks = res.map(dto => new NotebookModel(dto)),
      err => this.toast.error('Failed to get notebooks')
    );
  }

}
