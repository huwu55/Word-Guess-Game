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

    //if the pressed letter is part of the current guessing word, update the display string and return true
    //else return false
    updateDisplayWord: function(letter){
        var i, updated, decreaseGuesses;
        updated = false;
        decreaseGuesses = false;

        for (i=0; i<this.currentWord.length; i++){
            if (this.currentWord[i] === letter){
                updated = true;

                if(this.displayWord[i] === letter) {
                    decreaseGuesses = false;
                    continue;
                }

                decreaseGuesses = true;
                this.displayWord[i] = letter;
            }
        }

        if(updated){
            if(decreaseGuesses) 
                this.decreaseRemainingGuesses();

            document.getElementById("displayWord").innerHTML = this.displayWord.join(" ");
        } 

        return updated;
    },

    //push guessed letter into lettersAreadyGuessed array
    updateLettersAlreadyGuessed: function(letter){
        if (this.lettersAlreadyGuessed.length === 0){
            this.lettersAlreadyGuessed.push(letter);
            this.decreaseRemainingGuesses();
        }
        else{
            var same = false;
            //var decreaseGuesses = false;
            for(var i=0; i <this.lettersAlreadyGuessed.length; i++){
                if (this.lettersAlreadyGuessed[i] === letter) same=true;  
            }
            if(!same){
                this.lettersAlreadyGuessed.push(letter);
                this.decreaseRemainingGuesses();
            } 
        }

        document.getElementById("lettersAlreadyGuessed").innerHTML = this.lettersAlreadyGuessed.join("  ");
    },

    //start another round of word guessing, without refreshing number of wins
    resetGame: function(){
        document.getElementById("answer").innerHTML = this.currentWord;
        
        this.remainingGuesses = 15;
        this.lettersAlreadyGuessed=[];
        this.currentWord = this.words[Math.floor(Math.random()*this.words.length)];
        console.log(this.currentWord);
        this.displayWord = [];
        this.initialDisplayWord();
        document.getElementById("displayWord").innerHTML = this.displayWord.join(" ");
        document.getElementById("remainingGuesses").innerHTML = game.remainingGuesses;
        document.getElementById("wins").innerHTML = game.wins;
        document.getElementById("lettersAlreadyGuessed").innerHTML = ""; 
    }
};


game.resetGame();

document.onkeyup = function(event){

    if(event.keyCode < 65 || event.keyCode > 90);//{console.log("not a letter");  }

    // pressed key is a letter
    else {
        var key = event.key.toLowerCase();

        // if key maches a letter in the current word, update the display word
        if(game.updateDisplayWord(key)){
            if(game.currentWord === game.displayWord.join("")){
                game.wins++;
                game.resetGame();
            }
        }
        //else update guessed letters and decrease number of guesses remaining
        else {
            game.updateLettersAlreadyGuessed(key);
        }
    }
};
