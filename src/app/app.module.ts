import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ChooseMoveComponent } from './choose-move/choose-move.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ChooseMoveComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
