var game = {
    words: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
            "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million", "billion"], 
    wins: 0,
    remainingGuesses: 15,
    lettersAlreadyGuessed: [],

    //return number of "-" as a string corresponding with number of letters of current guessing word
    initialWord: function(word){
        var iniWord = [];
        for(var i=0; i<word.length; i++){
            iniWord.push("-");
        }
        return iniWord;
    },

    //if the pressed letter is part of the current guessing word, update the display string and return true
    //else return false
    updateDisplayWord: function(letter, curWord, disWord){
        var i, updated;
        updated = false;
        for (i=0; i<curWord.length; i++){
            if (curWord[i] === letter){
                disWord[i] = letter;
                updated = true;
            }
        }
        return updated;
    },

    decreaseRemainingGuesses: function(){
        // if(this.remainingGuesses == 0)
        // this.remainingGuesses--;
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
            console.log(this.lettersAlreadyGuessed.length);
        }
    },

    resetGame: function(){
        this.remainingGuesses = 15;
        this.lettersAlreadyGuessed=[];
        return this.words[Math.floor(Math.random()*this.words.length)];
    }
};

var currentWord = game.resetGame();
var displayWord = game.initialWord(currentWord);
console.log(currentWord);
console.log(displayWord);
document.getElementById("displayWord").innerHTML = displayWord.join(" ");
document.getElementById("remainingGuesses").innerHTML = game.remainingGuesses;

document.onkeyup = function(event){

    if(event.keyCode < 65 || event.keyCode > 90);//{console.log("not a letter");  }

    // pressed key is a letter
    else {
        var key = event.key.toLowerCase();
        console.log(key);

        // if key maches a letter in the current word, update the display word
        if(game.updateDisplayWord(key, currentWord, displayWord)){
            document.getElementById("displayWord").innerHTML = displayWord.join(" ");

            if(currentWord === displayWord.join("")){
                currentWord = game.resetGame();
                displayWord = game.initialWord(currentWord);
                document.getElementById("displayWord").innerHTML = displayWord.join(" "); 
                document.getElementById("lettersAlreadyGuessed").innerHTML = ""; 
            }
        }
        //else update guessed letters and decrease number of guesses remaining
        else {
            game.updateLettersAlreadyGuessed(key);
            document.getElementById("lettersAlreadyGuessed").innerHTML = game.lettersAlreadyGuessed.join("  ");
            game.remainingGuesses--;
            document.getElementById("remainingGuesses").innerHTML = game.remainingGuesses;
        }
    }
};
