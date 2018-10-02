var game = {
    words: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
            "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million", "billion"], 
    wins: 0,
    remainingGuesses: 15,
    lettersAlreadyGuessed: [],
    currentWord: "",
    displayWord: [],

    //return number of "-" as a string corresponding with number of letters of current guessing word
    initialDisplayWord: function(){
        for(var i=0; i<this.currentWord.length; i++){
            this.displayWord.push("-");
        }
    },

    //if the pressed letter is part of the current guessing word, update the display string and return true
    //else return false
    updateDisplayWord: function(letter){
        var i, updated;
        updated = false;
        for (i=0; i<this.currentWord.length; i++){
            if (this.currentWord[i] === letter){
                this.displayWord[i] = letter;
                updated = true;
            }
        }
        if(updated) document.getElementById("displayWord").innerHTML = this.displayWord.join(" ");

        return updated;
    },

    //keep track of number of remaining guesses
    decreaseRemainingGuesses: function(){
        if(this.remainingGuesses > 0)  {
            this.remainingGuesses--;
            document.getElementById("remainingGuesses").innerHTML = this.remainingGuesses;
        }
        else{
            this.resetGame();
        }
    },

    //push guessed letter into lettersAreadyGuessed array
    updateLettersAlreadyGuessed: function(letter){
        if (this.lettersAlreadyGuessed.length === 0)
            this.lettersAlreadyGuessed.push(letter);
        else{
            var same = false;
            for(var i=0; i <this.lettersAlreadyGuessed.length; i++){
                if (this.lettersAlreadyGuessed[i] === letter) same=true;  
            }
            if(!same) this.lettersAlreadyGuessed.push(letter);
        }

        document.getElementById("lettersAlreadyGuessed").innerHTML = this.lettersAlreadyGuessed.join("  ");
    },

    //start another round of word guessing, without refreshing number of wins
    resetGame: function(){
        this.remainingGuesses = 15;
        this.lettersAlreadyGuessed=[];
        this.currentWord = this.words[Math.floor(Math.random()*this.words.length)];
        this.displayWord = [];
        this.initialDisplayWord();
        document.getElementById("displayWord").innerHTML = this.displayWord.join(" ");
        document.getElementById("remainingGuesses").innerHTML = game.remainingGuesses;
        document.getElementById("wins").innerHTML = game.wins;
        document.getElementById("lettersAlreadyGuessed").innerHTML = ""; 
    }
};


game.resetGame();

console.log(game.currentWord);

document.onkeyup = function(event){

    if(event.keyCode < 65 || event.keyCode > 90);//{console.log("not a letter");  }

    // pressed key is a letter
    else {
        var key = event.key.toLowerCase();
        console.log(key);

        // if key maches a letter in the current word, update the display word
        if(game.updateDisplayWord(key)){
            game.decreaseRemainingGuesses();
            document.getElementById("displayWord").innerHTML = game.displayWord.join(" ");

            if(game.currentWord === game.displayWord.join("")){
                game.wins++;
                game.resetGame();
            }
        }
        //else update guessed letters and decrease number of guesses remaining
        else {
            game.decreaseRemainingGuesses();
            game.updateLettersAlreadyGuessed(key);
        }
    }
};
