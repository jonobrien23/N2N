const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz){
    let score = 0;
 
    // main game loop
    for (const [question,answer] of quiz){
       const response = ask(question);
       check(reponse,answer);
    }
    // end of main loop
    
    gameOver();
    
    // function declerations   
    function ask(question){
       return prompt(question);
    }
    
    function check(response,answer){
       if (response === answer){
           alert (`Correct!`);
           score++;
       } else {
           alert (`Wrong! The correct answer is ${answer}`);
       };
    }
    
    function gameOver(){
       alert (`Game Over! You scored ${score} point${score !== 1 ? 's' : ''}`);
    }
}

start(quiz);