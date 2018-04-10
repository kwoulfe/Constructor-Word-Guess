var Letter = require('./Letter.js');
// console.log('test');
var Word = function(word) {
  this.word = word;
  this.letters = [];
  this.wordFound = false;

  this.getLetters = function() {
    for (i = 0; i < this.word.length; i++) {
      var newLetter = new Letter(this.word[i]);
      this.letters.push(newLetter);
    }
  };

  this.checkWord = function() {
    if (
      this.letters.every(function(letter) {
        return letter.appear === true;
      })
    ) {
      this.wordFound = true;
      return true;
    }
  };

  this.checkLetter = function(letterGuessed) {
    var whatToReturn = 0;

    this.letters.forEach(function(letter) {
      if (letter.letter === letterGuessed) {
        letter.appear = true;
        whatToReturn++;
      }
    });
    return whatToReturn;
  };

  this.renderWord = function() {
    var display = ' ';

    this.letters.forEach(function(letter) {
      var currentLetter = letter.renderLetter();
      display += currentLetter;
    });
    return display;
  };
};

module.exports = Word;
