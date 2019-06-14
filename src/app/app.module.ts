import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Components
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotesComponent} from './notes/notes.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faPen,
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
  faStickyNote,
  faTrashAlt,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
// Toasts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
// Modules
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {APP_CONFIG, AppConfig} from './app.config';
import {AutosizeModule} from 'ngx-autosize';
import {AuthGuard} from './auth.guard';
import {AuthInterceptor} from './auth.interceptor';

const appRoutes: Routes = [
  {path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
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
    NotFoundComponent,
    RegisterComponent,
    LoginComponent
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
    ToastrModule.forRoot({newestOnTop: false, positionClass: 'toast-bottom-right'})
  ],
  providers: [{provide: APP_CONFIG, useValue: AppConfig},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // fontawesome library
    library.add(faStickyNote, faEnvelope, faPen, faTrashAlt, faPlusCircle, faUserPlus, faUser, faSignInAlt, faSignOutAlt);
  }
}
