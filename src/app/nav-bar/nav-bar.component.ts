import {Component, OnInit} from '@angular/core';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  faStickyNote = faStickyNote;

  ngOnInit() {
  }

}
