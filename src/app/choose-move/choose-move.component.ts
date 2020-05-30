import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-choose-move',
  templateUrl: './choose-move.component.html',
  styleUrls: ['./choose-move.component.css']
})
export class ChooseMoveComponent implements OnInit {

	public pins :Array<any>; // pins for to play
	public pinColors :Array<any>; // available colors of pins
	public randomPinColors :Array<any>; // initial color array
  @Output() public makeMove: EventEmitter<any> = new EventEmitter(); // event to tell the board to make a move 
  @Input() public stopGame$: Observable<any>; // observable to know when to stop the game
  public _stopGame: boolean;

  constructor()
  {
  	this.pinColors = ["red", "blue", "green", "yellow", "pink", "white"];
  	this.randomPinColors = [];
  }

  ngOnInit(): void
  {
  	this.setRamdonColors();

    // subscribe to the observable for know when to stop the game
    this.stopGame$.subscribe((response:any) => this._stopGame = response);
  }

  setRamdonColors()
  {
  	while(this.randomPinColors.length <= 3)
  	{
  		let randomNumber = Math.floor(Math.random() * ((this.pinColors.length - 1) + 0)) + 0;

  		if (this.randomPinColors.indexOf(this.pinColors[randomNumber]) === -1)
  			this.randomPinColors.push(this.pinColors[randomNumber]);
  	}
  }

  // change pin to the next color
  nextPinColor(pin)
  {
  	const currentColor = pin.getAttribute('data-color'),
  		  currentColorPos = this.pinColors.indexOf(currentColor);

  	if(currentColorPos === 5) // if the pin color is the last of the list, back to the first color
  	{
  		const firstPinColor = this.pinColors[0];

  		pin.setAttribute('data-color', firstPinColor);
  		pin.classList.remove(currentColor);
  		pin.classList.add(firstPinColor);

  	}else
  	{

  		const 	nextPinColor = this.pinColors[currentColorPos + 1]; // select the color that follows the one with the pin

  		pin.setAttribute('data-color', nextPinColor);
  		pin.classList.remove(currentColor);
  		pin.classList.add(nextPinColor);
  	}

  }

  // change pin to the previous color
  previousPinColor(pin)
  {
  	const currentColor = pin.getAttribute('data-color'),
  		  currentColorPos = this.pinColors.indexOf(currentColor);

  	if(currentColorPos === 0) // if the pin color is the first of the list, back to the last color
  	{
  		const lastPinColor = this.pinColors[5];

  		pin.setAttribute('data-color', lastPinColor);
  		pin.classList.remove(currentColor);
  		pin.classList.add(lastPinColor);

  	}else
  	{

  		const 	previousPinColor = this.pinColors[currentColorPos - 1]; // select the color that precedes the one with the pin

  		pin.setAttribute('data-color', previousPinColor);
  		pin.classList.remove(currentColor);
  		pin.classList.add(previousPinColor);
  	}

  }

  makeMoveEvent(row)
  {
    if (this._stopGame) // if the game is over, stop the action button
      return;

  	this.makeMove.emit({row}); // emit the move event to make play

  }

}
