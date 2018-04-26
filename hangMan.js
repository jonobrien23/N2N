// HangMan set variables
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let letterButtons = document.getElementById("letterButtons");

const myWords = ["Hello", "Goodbye", "Today", "Tomorrow"];  // Words for game
let guessCount = wrongGuesses = guessCorrect = 0;           // Score counters
let guessWord;                                              // Word for player to guess 
let guessLetter;                                            // Letter the player chooses
let hiddenLetters = [];                                     // Array to hide and reveal word0 per guess
let wordLetters = [];                                       // Array of the letters in the word to guess
let uniqueLetters = new Set();                              // Unique letters in the word to guess

// DOM elements to update as the game goes on
const view = {
    scoreRight: document.getElementById('scoresRight'),
    scoreWrong: document.getElementById('scoresWrong'),
    guessTheWord: document.getElementById('guessTheWord'),
    result: document.getElementById('result'),
    evaluateLetter: document.getElementById('evaluateLetter'),
    letterEntered: document.getElementById('letterEntered')
}

//Set up a new game
function initialSetup() {
    createButtons();
    guessCount = wrongGuesses = guessCorrect = 0;
    view.result.innerHTML = '';
    view.scoreRight.innerHTML = `correct guesses: ${guessCorrect}`;
    view.scoreWrong.innerHTML = `incorrect guesses: ${wrongGuesses}`;
    hiddenLetters.length = 0;
    document.getElementById("gameStart").style.display = "none";
    hangMan.getWord();
}

//createButtons();
function createButtons() {
    const parent = document.getElementById("letterButtons");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.id = alphabet[i];
        button.className = "btn";
        button.innerText = alphabet[i];
        button.disabled = false;
        letterButtons.appendChild(button);
    }
}

//Get the letter from the button press and check validity
function getTheLetter() {
    addEventListener('click', function (event) {
        var elementClicked = event.target;
        // get the element clicked on
        if (elementClicked.className === 'btn') {
            guessLetter = elementClicked.innerText;
            if (elementClicked.innerText !== 'Start') {
                hangMan.letterSearch(guessLetter);
                elementClicked.disabled = true;
            };
        }
        if ((guessCorrect === uniqueLetters.size && uniqueLetters.size !== 0) || (wrongGuesses === 10)) {
            hangMan.gameOver();
        };
    });
}

// Main game object
const hangMan = {
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

    // Check to see if the entered letter is contained in the word and reveal 
    letterSearch: function (letter) {
        let foundAtPosition = letterCount = 0;
        let guessMade = [];
        guessCount = wrongGuesses + guessCorrect;
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
        const parent = document.getElementById("letterButtons");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        if (wrongGuesses === 10) {
            view.result.innerHTML = "Game over. The correct word was:"
            view.guessTheWord.innerHTML = wordLetters.join(' ');
        } else {
            view.result.innerHTML = "Game over. You guessed the correct word"
        };
        document.getElementById("gameStart").style.display = "inline";
    },
}

getTheLetter();

let svg = document.getElementById("imageReveal");
svg.addEventListener("load",function(){
    let svgDoc = svg.contentDocument;
    let head = svgDoc.getElementById("1");
    head.style.display = "none";
})