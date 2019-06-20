import {RouterModule, Routes} from '@angular/router';
import {NotesComponent} from './components/user.notes/notes.component';
import {AuthGuard} from './auth/auth.guard';
import {FeedbackComponent} from './components/user.feedback/feedback.component';
import {UsersComponent} from './components/admin.users/users.component';
import {CommandsComponent} from './components/admin.commands/commands.component';
import {RegisterComponent} from './components/public.register/register.component';
import {LoginComponent} from './components/public.login/login.component';
import {NotFoundComponent} from './components/public.not-found/not-found.component';
import {AuthRole} from './auth/auth-role.enum';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'notes', component: NotesComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: 'commands', component: CommandsComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
