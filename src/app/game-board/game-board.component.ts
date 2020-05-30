import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Mastermind} from '../models/mastermind'

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  public rows :any[]; 
  @Input() public mastermind : Mastermind; // mastermind instance
  @Output() public gameOver : EventEmitter<any>;  // event to stop the game
  @ViewChild('gameBoard') public gameBoard : any;

  constructor()
  {
  	this.rows = [1,2,3,4,5,6,7,8,9,10]; // quantity of play rows

    this.gameOver = new EventEmitter();
  }


  ngOnInit(): void {
  }

  makeMove(move)
  {
    const rowToUse = this.gameBoard.nativeElement.rows[this.checkUsedRows()], // select the corresponding row
          colorsOfMove = this.getGuess(move), // get the selected colors of the play
          hints = this.mastermind.getHints(colorsOfMove); // evaluate the play and generate the hints if require
    
    // set move in the board
    this.setPinColors(rowToUse, colorsOfMove);

    // set hints by guessed positions of the play
    this.setHints(rowToUse,hints);

    // check if the play is winning
    if(this.checkIfPlayIsWinning(hints))
     return this.winningMove(this.gameBoard.nativeElement.rows[0], colorsOfMove);
    
    // if there are no more spaces in the game board the player loses 
    if (!this.checkUsedRows())
      return this.gameOverEvent(false);
  }

  getGuess(move) // get the guess of the player
  {
    const colorsOfMove = [];

    move.row.querySelectorAll('div[data-color]').forEach(pin => colorsOfMove.push(pin.getAttribute('data-color')));

    return colorsOfMove;
  }

  checkUsedRows(): number // check which will be the the row to use
  {

    const rows = this.gameBoard.nativeElement.rows;
    let  i = rows.length - 1; // select the last row because the board goes from to bottom to up

    while(i)
    {
        if (rows[i].getAttribute('data-used') == 'false') // select the last row where "data-used" attribute is false 
          break;

        i--;
    }

    return i;

  }

  setPinColors(row, colorsOfMove) // fill pins in the board with the select colors in the move
  {
      const pins = row.querySelectorAll('.big-circle');

      pins.forEach((pin,index) => {
        pin.setAttribute('data-color', colorsOfMove[index]);
        pin.classList.add(colorsOfMove[index]);
      });

      row.setAttribute('data-used',true);
  }

  setHints(rowToUse,hints) // fill hint pins in the board as required by the play
  {
     const pins = rowToUse.querySelectorAll('.small-circle');

    hints.forEach((hint,index) => {

       if (hint === 2) 
         pins[index].classList.add('black'); // guessed positions correct will be black
       
       if (hint === 1)
         pins[index].classList.add('white'); // guessed positions uncorrect will be white

     });

  }

  checkIfPlayIsWinning(move) // 
  {
    // if the length is 4, check if guess the secret code  
    if (move.length === 4)
    {
        let guessedPositions = move.filter(play => play === 2);

        return guessedPositions.length === 4;  
    }

    return false;

  }

  // if the player wins reveal the secret code in the first row of the board and
  // emit the event to stop the game
  winningMove(row, colorsOfMove)
  {
    const pins = row.querySelectorAll('.big-circle');

    pins.forEach((pin,index) => {
      pin.querySelector('i').remove(); // remove the question mark (?) 
      pin.setAttribute('data-color', colorsOfMove[index]);
      pin.classList.add(colorsOfMove[index]);
    });

    this.gameOverEvent(true); // stop the game
  }  

  gameOverEvent(success:boolean) // emit the event for stop the game with the corresponding message
  {
      if (success)
      {
        this.gameOver.emit({
          message: "You win!!!",
          type: 'alert-success'
        });
      }
      else{
        this.gameOver.emit({
          message: "You lose...",
          type: 'alert-danger'
        });
      }
  }


}
