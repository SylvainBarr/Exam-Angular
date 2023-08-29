import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {authGuard} from "./guard/auth/auth.guard";
import {CharactersListComponent} from "./view/characters-list/characters-list.component";
import {CharacterDetailComponent} from "./view/character-detail/character-detail.component";
import {CharacterEditComponent} from "./view/character-edit/character-edit.component";
import {CharacterNewComponent} from "./view/character-new/character-new.component";
import {NotFoundComponent} from "./view/not-found/not-found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'characters'},
  {path: 'login', component: LoginComponent},
  {path: 'characters', children: [
      {path: '', component: CharactersListComponent},
      {path: 'page/:page', component: CharactersListComponent},
      {path: 'new', component: CharacterNewComponent},
      {path: ':id', children:[
          {path: '', component: CharacterDetailComponent},
          {path: 'edit', component: CharacterEditComponent},
        ]},
    ]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
