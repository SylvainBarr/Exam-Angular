import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { CharactersListComponent } from './view/characters-list/characters-list.component';
import { CharacterDetailComponent } from './view/character-detail/character-detail.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { CharacterEditComponent } from './view/character-edit/character-edit.component';
import { CharacterNewComponent } from './view/character-new/character-new.component';
import { CharacterFormComponent } from './component/character-form/character-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CharactersListComponent,
    CharacterDetailComponent,
    NotFoundComponent,
    CharacterEditComponent,
    CharacterNewComponent,
    CharacterFormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
