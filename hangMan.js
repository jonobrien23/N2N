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
let uniqueLetters = new Set();                              // Unique letters in the word to guess                                         // Array of face elements to reveal on wrong guesses
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
context.lineWidth = 5;
canvas.style = "Position: relative; left: 50%; width: 400px; margin-left: -200px";
canvas.fillStyle="#FFFFFF";

const graphics = {
    base: function () {
        context.beginPath();
        context.moveTo(20, 380);
        context.bezierCurveTo(20, 360, 480, 360, 480, 380);
        context.stroke();
    },

    stand: function () {
        context.beginPath();
        context.moveTo(40, 390);
        context.bezierCurveTo(20, 30, 40, 30, 50, 30);
        context.stroke();
    },

    gib: function () {
        context.beginPath();
        context.moveTo(25, 35);
        context.bezierCurveTo(20, 30, 40, 25, 275, 40);
        context.stroke();
    },

    noose: function () {
        context.beginPath();
        context.moveTo(250, 30);
        context.bezierCurveTo(240, 55, 240, 75, 250, 100);
        context.stroke();
    },

    head: function () {
        context.beginPath();
        context.arc(250, 135, 40, 0, 2 * Math.PI);
        context.stroke();
    },

    body: function () {
        context.beginPath();
        context.moveTo(250, 170);
        context.bezierCurveTo(240, 265, 240, 295, 240, 310);
        context.stroke();
    },

    leftArm: function () {
        context.beginPath();
        context.moveTo(260, 200);
        context.bezierCurveTo(250, 185, 240, 190, 150, 180);
        context.stroke();
    },

    rightArm: function () {
        context.beginPath();
        context.moveTo(245, 200);
        context.bezierCurveTo(235, 195, 245, 200, 345, 210);
        context.stroke();
    },

    leftLeg: function () {
        context.beginPath();
        context.moveTo(242, 295);
        context.bezierCurveTo(240, 305, 208, 345, 200, 350);
        context.stroke();
    },

    rightLeg: function () {
        context.beginPath();
        context.moveTo(237, 295);
        context.bezierCurveTo(240, 305, 270, 340, 295, 355);
        context.stroke();
    }
}

const drawHangMan = [graphics.base,
graphics.stand,
graphics.gib,
graphics.noose,
graphics.head,
graphics.body,
graphics.leftArm,
graphics.rightArm,
graphics.leftLeg,
graphics.rightLeg];

// DOM elements to update as the game goes on
const view = {
    scoreRight: document.getElementById('scoresRight'),
    scoreWrong: document.getElementById('scoresWrong'),
    guessTheWord: document.getElementById('guessTheWord'),
    result: document.getElementById('result'),
    evaluateLetter: document.getElementById('evaluateLetter'),
    letterEntered: document.getElementById('letterEntered')
}

// Main game object
const hangMan = {
    //Set up a new game
    initialSetup: function () {
        this.createButtons();
        guessCount = wrongGuesses = guessCorrect = 0;
        view.result.innerHTML = '';
        view.scoreRight.innerHTML = `correct guesses: ${guessCorrect}`;
        view.scoreWrong.innerHTML = `incorrect guesses: ${wrongGuesses}`;
        hiddenLetters.length = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("gameStart").style.display = "none";
        this.getWord();
    },

    //createButtons();
    createButtons: function () {
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
    },

    //Get the letter from the button press and check validity
    getTheLetter: function () {
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
        if (wrongGuesses > 0) {
            drawHangMan[wrongGuesses - 1]();
        };
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

hangMan.getTheLetter();