import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteModel} from '../../../../model/note.model';
import {HttpService} from '../../../../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note: NoteModel;
  @Output() clickDelete = new EventEmitter();
  private noteCopy: NoteModel;

  constructor(private http: HttpService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.noteCopy = new NoteModel(this.note);
  }

  updateNote() {
    this.http.updateNote(this.note).subscribe(
      res => {
        Object.assign(this.note, res);
        Object.assign(this.noteCopy, res);
        this.toast.success('Note updated');
      },
      () => {
        Object.assign(this.note, this.noteCopy);
        this.toast.error('Failed to update note');
      }
    );
  }

}
