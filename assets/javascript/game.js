var pressAnyKey = true;
var newGameStart = true;
var winCount = 0;

document.onkeyup = function(event){
	var key = event.key;
	if(pressAnyKey){
		game.setHtml(game.gameResultHtml,"");
		pressAnyKey = false;
		newGameStart = true;
	}
	if(newGameStart){
		game.newGame();
		newGameStart = false;
	}
	else{
		game.guessChar(key);
	}

	
}

var game ={
	displayWordHtml: document.getElementById("displayWord"),
	guessCountHtml: document.getElementById("guessCount"),
	winCountHtml: document.getElementById("winCount"),
	lettersGuessedHtml: document.getElementById("lettersGuessed"),
	gameResultHtml: document.getElementById("gameResult"),
	currentWord: "testing",
	displayWord: "",
	guessCount: 6,
	lettersGuessed: [],
	wordList: ["mallory","ryan", "linus", "family"],

	guessChar: function(char){
		console.log("guess: " + char + " displayWord: " + this.displayWord);
		if(this.guessCorrect(char)){
			this.writeDisplayWord(char);
		}
		this.setHtml(this.displayWordHtml,this.displayWord);
		if (this.gameOver()) {
			pressAnyKey = true;
		}
		this.setHtml(this.displayWordHtml,this.displayWord);
		this.setHtml(this.guessCountHtml,this.guessCount);
		this.setHtml(this.lettersGuessedHtml,this.lettersGuessed);
	},
	setHtml: function(htmlElement,string){
		console.log("Updating HTML element" + htmlElement);
		htmlElement.innerText = string;
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
		console.log("New displayWord: " + this.displayWord);
	},
	replaceCharAt: function(string, index, char){
		var result = string.substr(0,index) + char + string.substr(index+1);
		console.log("replaceCharAt() called- original: " + string + " return: " + result);
		return result;
	},
	gameOver: function(){
		if (this.guessCount <= 0) {
			this.setHtml(this.gameResultHtml,"You Lost!\n Press any key to play again");
			return true;
		}
		else if(this.checkWin()){
			winCount++;
			this.setHtml(this.winCountHtml,winCount);
			this.setHtml(this.gameResultHtml,"WINNER!\n Press any key to play again");
			return true;
		}
		else{return false;}
	},
	checkWin: function(){
		if (this.displayWord===this.currentWord) {return true;}
		else{return false;}
	},
	
	//start new game functions
	newGame: function(){
		this.resetBoard();
		console.log("Board reset\n currentWord: " + this.currentWord);
		this.setHtml(this.displayWordHtml,this.displayWord);
		this.setHtml(this.guessCountHtml,this.guessCount);
		this.setHtml(this.lettersGuessedHtml,this.lettersGuessed);
	},
	pickWord: function(){
		var string = this.wordList[Math.floor(Math.random()*this.wordList.length)]
		return string;
	},
	resetBoard: function(){
		this.currentWord = this.pickWord();
		this.resetDisplayWord(this.currentWord);
		this.guessCount = 6;
		this.lettersGuessed = [];

	},
	resetDisplayWord: function(string){
		this.displayWord = "";
		for (var i = 0; i < string.length; i++) {
			this.displayWord = this.displayWord + '-';
		}
		console.log("resetting displayWord- currentWord: " + this.currentWord + "displayWord: " + this.displayWord);
	}
}

