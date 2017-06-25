alert('success');

document.onkeyup = function(event){
	var key = event.key;
	game.guessChar(key);
}

var game ={
	displayWordHtml: document.getElementById("displayWord"),
	guessCountHtml: document.getElementById("guessCount"),
	winCountHtml: document.getElementById("winCount"),
	lettersGuessedHtml: document.getElementById("lettersGuessed"),
	currentWord: "testing",
	displayWord: "-------",
	guessCount: 6,
	winCount: 0,
	lettersGuessed: [],
	setHtml: function(htmlElement,string){
		this.htmlElement.innerText = string;
	},
	guessCorrect: function(char){
		if(this.currentWord.includes(char)){return true;}
		else{
			if (this.lettersGuessed.indexOf(char) < 0) {
				this.guessCount--;
				this.lettersGuessed.push(char);
				this.lettersGuessed.sort()
				console.log("Guess incorrect. Adding " + char + " to the lettersGuessed array\nGuesses remaining: " + this.guessCount);
			}
			return false;}
	},
	writeDisplayWord: function(char){
		console.log("writeDisplayWord() called\nCurrent displayWord: " + this.displayWord);
		for (var i = 0; i < this.currentWord.length; i++) {
			if(this.currentWord.charAt(i) === char){
				this.displayWord = this.replaceCharAt(this.displayWord,i,char);
			}
		}
	},
	replaceCharAt: function(string, index, char){
		var result = string.substr(0,index) + char + string.substr(index+1);
		console.log("replaceCharAt() called- original: " + string + " return: " + result);
		return result;
	},
	gameOver: function(){
		if (this.guessCount <= 0) { return true;}
		else{return false;}
	},
	guessChar: function(char){
		console.log("guess: " + char + " displayWord: " + this.displayWord);
		if(this.guessCorrect(char)){
			this.writeDisplayWord(char);
		}
		if (this.gameOver()) {
			alert("Game Over") 
		}
		this.setHtml(this.displayWordHtml,this.displayWord);
	}
}

