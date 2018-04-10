var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./Word.js');
var Game = require('./Game.js');

var hangManDisplay = Game.newWord;
var wordBank = Game.newWord.wordList;
var guessesRemaining = 10;
var guessedLetters = [];
var display = 0;
var currentWord;

startGame();

function startGame() {
  console.log('---------------------------------------------------------');
  console.log('');
  console.log('Baseball Team Hangman!');
  console.log('');
  console.log('---------------------------------------------------------');

  if (guessedLetters.length > 0) {
    guessedLetters = [];
  }

  inquirer
    .prompt([
      {
        name: 'play',
        type: 'confirm',
        message: 'Are you ready to play?'
      }
    ])
    .then(function(answer) {
      if (answer.play) {
        console.log('');
        console.log('You have 10 guesses to pick the right baseball team.');
        console.log('Good Luck!');
        newGame();
      } else {
        console.log('Have it your way!');
      }
    });
}

function newGame() {
  if (guessesRemaining === 10) {
    console.log('---------------------------------------------------------');

    var randNum = Math.floor(Math.random() * wordBank.length);
    currentWord = new Word(wordBank[randNum]);
    currentWord.getLetters();

    console.log('');
    console.log(currentWord.renderWord());
    console.log('');
    promptUser();
  } else {
    resetGuessesRemaining();
    newGame();
  }
}

function resetGuessesRemaining() {
  guessesRemaining = 10;
}
function promptUser() {
  inquirer
    .prompt([
      {
        name: 'chosenLetter',
        type: 'input',
        message: 'Choose a letter',
        validate: function(value) {
          if (isLetter(value)) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(letter) {
      var letterReturned = letter.chosenLetter.toUpperCase();

      var guessedAlready = false;
      for (var i = 0; i < guessedLetters.length; i++) {
        if (letterReturned === guessedLetters[i]) {
          guessedAlready = true;
        }
      }

      if (guessedAlready === false) {
        guessedLetters.push(letterReturned);
        var found = currentWord.checkLetter(letterReturned);

        if (found === 0) {
          console.log('Sorry! Try again!');

          guessesRemaining--;

          console.log('Guesses reamaining: ' + guessesRemaining);
          console.log(hangManDisplay[display - 1]); // prints the hangman display

          console.log(
            '---------------------------------------------------------'
          );
          console.log('');
          console.log(currentWord.renderWord());
          console.log('');
          console.log(
            '---------------------------------------------------------'
          );
          console.log('Letters guessed: ' + guessedLetters);
        } else {
          console.log('Yes! You are correct!!');

          if (currentWord.checkWord() === true) {
            console.log('');
            console.log(currentWord.renderWord());
            console.log('');
            console.log('----- YOU WIN -----');
            startGame();
          } else {
            console.log('Guesses remaining: ' + guessesRemaining);
            console.log('');
            console.log(currentWord.renderWord());
            console.log('');
            console.log(
              '---------------------------------------------------------'
            );
            console.log('Letters guessed: ' + guessedLetters);
          }
        }

        if (guessesRemaining > 0 && currentWord.wordFound === false) {
          promptUser();
        } else if (guessesRemaining === 0) {
          console.log('');
          console.log('----- GAME OVER -----');
          console.log('');
          console.log('The correct team is: ' + currentWord.word);
          console.log('');
        }
      } else {
        console.log('That letter has been guessed, try again.');
        promptUser();
      }
    });
}
