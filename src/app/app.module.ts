import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotesComponent} from './notes/notes.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'notes', component: NotesComponent},
  {path: 'feedback', component: FeedbackComponent},
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full'
  },
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FeedbackComponent,
    NotesComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
