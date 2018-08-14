var inquirer = require("inquirer");


function Word (word) {
  this.word = word;
  this.wordArray = function () {
      return word.split("");
    }
  this.guess = function () {
    var guess = Array(word.length);
    for(i =0; i< guess.length; i++) {
      guess[i] = "-";
    }
    return guess;
  } 
  this.guessRemaining = 5;
}

var wordList = ["tony", "park", "television", "crybaby"];
var index = 0;
var currentWord = "";
var referenceWord = "";
var guess = "";
var wordArray = "";


function resetVariables() {
  currentWord = new Word(wordList[index]);
  guess = currentWord.guess();
  referenceWord = currentWord.wordArray();
  wordArray = currentWord.wordArray();
}

function start() {
    console.log(guess);
    inquirer.prompt({
      name: "letter",
      message: "Guess a letter."
    }).then(function(answer) {

      if(referenceWord.includes(answer.letter) === false) {
        console.log("wrong!");
        currentWord.guessRemaining--;
        console.log("You have " + currentWord.guessRemaining + " guesses remaining");

        if (currentWord.guessRemaining === 0) {
          console.log("you lose, try again");
          resetVariables();
  
        } 

        start();
      }

      for(i=0; i <= wordArray.length; i++) {
        if(answer.letter === wordArray[i]) {
          console.log("correct!");
          letterIndex = wordArray.indexOf(answer.letter);
          wordArray[letterIndex] = "-";
          guess[letterIndex] = answer.letter;
          if (guess.join("") === currentWord.word) {
            console.log("you win");
            console.log("next word to guess...is...");
            index++;
            resetVariables();
          }
          start();
        } 
      }

      
 
      
    });
  };

  resetVariables();
  start();
