import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Components
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotesComponent} from './notes/notes.component';
import {NotFoundComponent} from './not-found/not-found.component';
// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faPen, faPlusCircle, faStickyNote, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
// Toasts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
// Modules
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {APP_CONFIG, AppConfig} from './app.config';
import {AutosizeModule} from 'ngx-autosize';

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
    NgxPaginationModule,
    ReactiveFormsModule, FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutosizeModule,
    ToastrModule.forRoot({newestOnTop: false})
  ],
  providers: [{provide: APP_CONFIG, useValue: AppConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // fontawesome library
    library.add(faStickyNote, faEnvelope, faPen, faTrashAlt, faPlusCircle);
  }
}
