import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ChildcomponentComponent } from './scramble/childcomponent.component';
import { UnscrambleComponent } from './unscramble/unscramble.component';
import { ScrabbleComponent } from './scrabble/scrabble.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildcomponentComponent,
    UnscrambleComponent,
    ScrabbleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
