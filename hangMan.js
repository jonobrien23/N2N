// HangMan set variables
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let letterButtons = document.getElementById("letterButtons");

const myWords = ["Hello", "Goodbye", "Today", "Tomorrow"];
let guessCount = wrongGuesses = guessCorrect = 0;
let guessWord, guessLetter;
let hiddenLetters = [];
let wordLetters = [];
let lettersGuessed = [];
let uniqueLetters = new Set();

createButtons();

function createButtons() {
    let button = document.createElement("button");
    for (let i = 0; i < alphabet.length; i++) {
        button.id = alphabet[i];
        button.innerText = alphabet[i];
        letterButtons.appendChild(button);
    }
}

const view = {
    scoreRight: document.getElementById('scoresRight'),
    scoreWrong: document.getElementById('scoresWrong'),
    guessTheWord: document.getElementById('guessTheWord'),
    result: document.getElementById('result'),
    evaluateLetter: document.getElementById('evaluateLetter'),
    letterEntered: document.getElementById('letterEntered')
}

const hangMan = {
    startGame: function () {
        this.getWord();
        while ((guessCorrect < uniqueLetters.size) && (wrongGuesses < 10)) {
            this.letterGuess();
            this.letterSearch(guessLetter);
        };
        this.gameOver();
    },

    // Choose random word and add to the word and reveal array
    getWord: function () {
        let wordCount = myWords.length;
        let chosenWord = (Math.floor(Math.random() * (wordCount - 1)) + 1);
        guessWord = myWords[chosenWord].toLowerCase();
        wordLetters = guessWord.split("");
        for (let i = 0; i < wordLetters.length; i++) {
            hiddenLetters[i] = '_';
        };
        uniqueLetters = new Set(guessWord);
        view.guessTheWord.innerHTML = hiddenLetters.join(' ');
    },

    // enter letter and check for single charachter and already used
    letterGuess: function () {
        let alreadyUsed = 1;
        guessCount = wrongGuesses + guessCorrect;
        guessLetter = prompt(`Guess a letter`);
        guessLetter = guessLetter.toLowerCase();
        while (guessLetter.length !== 1 || this.isValidCraracter(guessLetter)) {
            guessLetter = prompt(`Please enter 1 letter only`);
            guessLetter = guessLetter.toLowerCase();
        };
        while (alreadyUsed !== 0) {
            for (let i = 0; i <= lettersGuessed.length; i++) {
                if (lettersGuessed[i] === guessLetter) {
                    guessLetter = prompt(`Letter already used, please try again`);
                    guessLetter = guessLetter.toLowerCase();
                    alreadyUsed = 1;
                } else {
                    alreadyUsed = 0;
                };
            };
        };
        lettersGuessed[guessCount] = guessLetter;
    },

    // Make sure the entered character ia a valid letter a -> z
    isValidCraracter: function (letter) {
        let myRegExp = /[a-z]/ig;
        return !(myRegExp.test(letter));
    },

    // Check to see if the entered letter is contained in the word and reveal 
    letterSearch: function (letter) {
        let foundAtPosition = letterCount = 0;
        let guessMade = [];
        while (foundAtPosition !== -1) {
            foundAtPosition = guessWord.indexOf(letter, foundAtPosition);
            if (foundAtPosition !== -1) {
                letterCount++;
                foundAtPosition++;
            };
        };
        //reveal letter code
        guessMade[guessCorrect] = letter;
        for (let i = 0; i < guessMade.length; i++) {
            for (let j = 0; j < wordLetters.length; j++) {
                if (guessMade[i] === wordLetters[j]) {
                    hiddenLetters[j] = guessMade[i]
                };
            };
        };
        //update the on screen test with guessed letter and change the scores as needed
        view.guessTheWord.innerHTML = hiddenLetters.join(' ');
        guessCorrect = ((guessWord.includes(letter)) ? guessCorrect + 1 : guessCorrect);
        wrongGuesses = ((guessWord.includes(letter)) ? wrongGuesses : wrongGuesses + 1);
        view.scoreRight.innerHTML = `correct guesses: ${guessCorrect}`;
        view.scoreWrong.innerHTML = `incorrect guesses: ${wrongGuesses}`;
    },

    gameOver: function () {
        if (wrongGuesses === 10) {
            view.result.innerHTML = "Game over. The correct word was:"
            view.guessTheWord.innerHTML = wordLetters.join(' ');
        } else {
            view.result.innerHTML = "Game over. You guessed the correct word"
        };
    },
}

//hangMan.startGame();
