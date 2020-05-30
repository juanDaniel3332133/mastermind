import { Component, ViewChild, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import  { GameBoardComponent } from './game-board/game-board.component'
import {Mastermind} from './models/mastermind'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{

  title = 'Mastermind';
  public _gameOver :any; // this var will contains the message when the player wins or loses
  public code :Array<any>;
  public pinColors :Array<any>; // available colors in the game
  public stopGame: BehaviorSubject<any>; // subject emititing the event for stop the game
  @Output() public mastermind: Mastermind; // mastermind instance containing the logic for evaluate the guess 
  @Output() public stopGame$: Observable<any>; // observable of subject
  @ViewChild(GameBoardComponent) public gameBoardComponent : GameBoardComponent; // gameBoardComponent

  constructor()
  {
  	this.pinColors = ["red", "blue", "green", "yellow", "pink", "white"];
  	this.code = [];
  	this.stopGame = new BehaviorSubject(false);
  	this.stopGame$ = this.stopGame.asObservable();
  }

  ngOnInit()
  {
  	this.generateRandomCode();
  	this.mastermind = new Mastermind(this.code);

    // uncomment this if you want see the secret code in the console
  	// console.log(this.code);
  }

  // generate the secret code
  generateRandomCode()
  {
  	while(this.code.length <= 3)
  	{
  		let randomNumber = Math.floor(Math.random() * ((this.pinColors.length - 1) + 0)) + 0;

  		this.code.push(this.pinColors[randomNumber]);

  	}

  }

  // make play event 
  makeMove(move)
  {
  	this.gameBoardComponent.makeMove(move);
  }

  // stop the game when the player wins or loses
  gameOver(e)
  {
  	this._gameOver = e;
  	this.stopGame.next(true);
  }
  
  // refresh the page 
  refresh()
  {
  	window.location.reload();
  }

}
