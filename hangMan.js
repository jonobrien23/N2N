// HangMan set variables
const myWords = ["Hello", "Goodbye", "Today", "Tomorrow"];
let guessCount = wrongGuesses = guessCorrect = 0;
let guessWord, guessLetter, letterCount;
let hiddenLetters = [];
let wordLetters = [];
let guessMade = [];
let lettersGuessed = [];

// Choose random word and add to the word and reveal array
function getWord() {
    let wordCount = myWords.length;
    let chosenWord = (Math.floor(Math.random() * (wordCount - 1)) + 1);
    guessWord = myWords[chosenWord].toLowerCase();
    wordLetters = guessWord.split("");
    for (let i = 0; i < wordLetters.length; i++) {
        hiddenLetters[i] = '_';
    };
}

// enter letter and check for single charachter and already used
function letterGuess() {
    let alreadyUsed = 1;
    guessCount = wrongGuesses + guessCorrect;
    guessLetter = prompt(`Guess a letter`);
    while (guessLetter.length !== 1) {
        guessLetter = prompt(`Please enter 1 letter only`);
    };
    while (alreadyUsed !== 0) {
        for (let i = 0; i <= lettersGuessed.length; i++) {
            if (lettersGuessed[i] === guessLetter) {
                guessLetter = prompt(`Letter already used, please try again`);
                alreadyUsed = 1;
            } else {
                alreadyUsed = 0;
            };
        };
    };
    lettersGuessed[guessCount] = guessLetter;
}

function isValidCraracter(guessLetter){
    let myRegExp = /[a-z]/ig;
    return ! (myRegExp.test(guessLetter));
}

// Check to see if the entered letter is contained in the word
function letterSearch(letter) {
    let foundAtPosition = letterCount = 0;
    while (foundAtPosition !== -1) {
        foundAtPosition = guessWord.indexOf(letter, foundAtPosition);
        if (foundAtPosition !== -1) {
            letterCount++;
            foundAtPosition++;
        };
    };
}

// Reveal the correct letter in the hidden word
function correctLetters(letter) {
    guessMade[guessCorrect] = letter;
    for (let i = 0; i < guessMade.length; i++) {
        for (let j = 0; j < wordLetters.length; j++) {
            if (guessMade[i] === wordLetters[j]) {
                hiddenLetters[j] = guessMade[i]
            };
        };
    };
}

getWord();
console.log(hiddenLetters.join(''));
console.log(hiddenLetters.length + ' Letters in the word');

while (wrongGuesses < 10) {
    letterGuess();
    letterSearch(guessLetter);
    correctLetters(guessLetter);
    guessCorrect = ((guessWord.includes(guessLetter)) ? guessCorrect + 1 : guessCorrect);
    wrongGuesses = ((guessWord.includes(guessLetter)) ? wrongGuesses : wrongGuesses + 1);
    console.log((guessWord.includes(guessLetter)) ? `${guessLetter} included ${letterCount} time(s)` : `${guessLetter} not present`);
    console.log(`Word to Guess: ${hiddenLetters.join('')}`);
    console.log(`incorrect guesses: ${wrongGuesses}`);
    console.log(`correct guesses: ${guessCorrect}`);
}
