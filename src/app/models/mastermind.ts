export class Mastermind
{
	constructor(
		private code: Array<any>
	)
	{

	}

	getHints(guess:Array<string>)
	{
		const hints = [], // var containig the hints
			  _guess = [...guess]; // copy of the guess that will be modified

		this.getCorrectCodePins(hints, _guess); // get the correct guessed position 

		const colorsWithoutRepeating = new Set([...guess]);

		// if the code contains repeated colors it must evaluate more conditions
		if (colorsWithoutRepeating.size !== 4)
			this.checkRepeatedCodePegs(colorsWithoutRepeating, guess, _guess);
		
		this.getIncorrectCodePins(hints, _guess); // get wrong guessed positions

		return hints;
	}

	// get the correct guessed positions
	getCorrectCodePins(hints:Array<any>, guess)
	{
		this.code.forEach((color, index) => {

			if (guess[index] === color)
			{
				// the correct guessed positions will be markeds as two
				hints.push(2);

				// the evaluated position is removed from the guess. 
				// This is done so that hints are not repeated
				guess[index] = undefined; 
			}

		});
	}

	// get the wrong guessed positions
	getIncorrectCodePins(hints:Array<any>, guess)
	{
		this.code.forEach((color, index) => {

			if (guess[index] !== color && this.code.includes(guess[index]))
			{
				// the wrong guessed positions that exists in the code will be markeds as one
				hints.push(1);

				// the evaluated position is removed from the guess. 
				// This is done so that hints are not repeated
				guess[index] = undefined; // the guessed position is correct
			}
		
		});
	}	

	checkRepeatedCodePegs(colorsWithoutRepeating, guess, _guess)
	{
		colorsWithoutRepeating.forEach( color => {

			//  get the quantity of repeated colors in the code and in the guess
			const repeatedColorsInTheCode = this.code.filter(_color => _color === color),
					repeatedColorsInTheGuess = guess.filter(_color => _color === color);

			// In the case that the quantity of repeated colors in the guess is greather than 
			// quanity of repeated colors in the code, These must be equal in quantity
			//   to avoid generating incorrect hints
			while(repeatedColorsInTheGuess.length > repeatedColorsInTheCode.length)
			{
				const color = repeatedColorsInTheGuess[0];
				
				// the evaluated position is removed from the guess. 
				// This is done so that hints are not repeated
				_guess[_guess.indexOf(color)] = undefined; 

				//
				repeatedColorsInTheGuess.splice(0,1);
			}

		});
	}

}
