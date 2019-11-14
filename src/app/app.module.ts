import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Components
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FeedbackComponent} from './components/role.user/feedback/feedback.component';
import {NotesComponent} from './components/role.user/notes/notes.component';
import {ErrorComponent} from './components/error/error.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UsersComponent} from './components/role.admin/users/users.component';
import {CommandsComponent} from './components/role.admin/commands/commands.component';
// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faExchangeAlt,
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AutosizeModule} from 'ngx-autosize';
import {RouterModule, Routes} from '@angular/router';
import {RouteUrls} from './app.route-urls';
// Services
import {AuthInterceptor} from './auth/auth.interceptor';
import {AuthRedirectGuard} from './auth/auth.redirect.guard';
import {AuthGuard} from './auth/auth.guard';
import {AuthRole} from './auth/auth-role.enum';
import {NoteCardComponent} from './components/role.user/notes/note-card/note-card.component';
import {EnvConfigProvider} from './env.injector';

const appRoutes: Routes = [
  {path: RouteUrls.REGISTER, component: RegisterComponent, canActivate: [AuthRedirectGuard]},
  {path: RouteUrls.LOGIN, component: LoginComponent, canActivate: [AuthRedirectGuard]},
  {path: RouteUrls.NOTES, component: NotesComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: RouteUrls.FEEDBACK, component: FeedbackComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: RouteUrls.USERS, component: UsersComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: RouteUrls.COMMANDS, component: CommandsComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: RouteUrls.ERROR, component: ErrorComponent},
  {path: '**', component: ErrorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FeedbackComponent,
    NotesComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    CommandsComponent,
    NoteCardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutosizeModule,
    ToastrModule.forRoot({newestOnTop: false, positionClass: 'toast-bottom-right'})
  ],
  providers: [
    EnvConfigProvider,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // fontawesome library
    library.add(faStickyNote, faEnvelope, faPen, faTrashAlt, faPlusCircle, faUserPlus, faUser, faSignInAlt, faSignOutAlt, faExchangeAlt);
  }
}
