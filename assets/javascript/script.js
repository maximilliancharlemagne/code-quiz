// The quiz script

//Setting up some global variables
let originalTime = 300 //The value to reset the time to for each quiz
let time = originalTime //Time (in seconds) the user has remaining for the quiz
//time increased from 60 to 300 based on user feedback
let myTimer //timer variable for setInterval
let index = 0 //What question are we on?
let myScore = 0 //What is the player's current score?
let scores = [] //array of high scores (score objects)

// Make a high score class
class highScore {
  constructor(name,score,time){
    this.name = name;
    this.score = score;
    this.time = time;
  }
}

//Make a question class
class question {
  constructor(title, description, arr_of_answers, num) {
    this.title = title;
    this.description = description;
    this.answers = arr_of_answers;
    this.indexOfCorrectAnswer = num;
  }
}

//Use the question class to make an object for each question
const question1 = new question('Question 1', 'Which of the below is a valid keyword for declaring a variable in Javascript?', ['var', 'let', 'const', 'All of the above'], 3)
const question2 = new question('Question 2', 'What will be the result of the following code? <br> <br> let num = 5 <br> let sum = num + 3 <br> console.log(sum)', ['3 will be logged to the console', '8 will be logged to the console', '2 will be logged to the console', 'The code will result in an error'], 1)
const question3 = new question('Question 3', 'Which of the below is a valid data type in JavaScript?', ['long','float','Number','Mayonnaise'],2)
const question4 = new question('Question 4', `What does the term 'function hoisting' mean?`,['When a function is declared, all the variables declared in the function are moved to the beginning of the file','When a function is declared, the function declaration is moved to the beginning of the file','When a function is declared, the function declaration is compiled before the other content in the file (but not actually moved to the top of the file)'],2)
const question5 = new question('Question 5', 'What does the term \'API\' stand for?',['Application Programming Interface','Algorithm Performance Interface','Application Performance Interface','Algorithm Programming Interface'],0)

//Make a list of all the questions
let listOfQuestions = [question1, question2, question3, question4, question5]

//Define the functions

function quizWrapper() {
  //Handles the start of the quiz

  //Resets index (of the current question), score, and time
  console.log('Quiz wrapper activated')

  index = 0
  console.log('Index reset')

  time = originalTime
  console.log('Time reset')

  myScore = 0
  console.log('Score reset')
  
  //Writes the original HTML to the current page, in case we're being called from the high score page and need to reset the page
  document.body.innerHTML = `  <div class="row mt-3">
    <div class="ml-5 col text-left">
      <a onclick="highScoreHandler()" id="highScores" class="btn btn-primary text-white">High Scores</a>
    </div>
    <div class="mr-5 col text-right">
      <p id = "time">Time Remaining: ${Math.floor(time / 60)} minutes ${time % 60} seconds</p>
    </div>
  </div>
  <div class="row">
    <div class = "col-md-3"></div>
    <div id = "quiz" class="col-md-6 bg-light text-center py-2">
      <!-- The quiz -->
    </div>
    <div class = "col-md-3"></div>
  </div>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="./assets/javascript/script.js"></script>`

  //Display the starting screen: just a "start the quiz" button for now
  document.getElementById('quiz').innerHTML = '<button type="button" onclick = "buttonHandler(`start`)" id="startBtn" class="btn btn-danger">Start the Quiz!</button>'
  //When the button is pressed, control flow will pass to buttonHandler, which, when called with argument 'start', will in turn pass control to quizHandler.
}

function buttonHandler(buttonType) {
  console.log(`Button handler called with arg ${buttonType}`) //for debugging

  switch (buttonType) { //We have to decide what do based on what type of button was pressed? What a great use case for a switch statement!
    case 'start':
      console.log('Start button pressed')
      quizHandler() //Pass control to quizHandler
      break;
    case 'incorrect':
      console.log('Incorrect answer')
      myScore -= 10 //update global vars
      time -= 30
      index++ //add 1 to the index
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      // If we are at the end of the list of questions, pass control to endHandler(). If not, run questionHandler (which will producte a new result, because we updated the index).
      break;
    case 'correct':
      console.log('Correct answer')
      myScore += 10 //update global vars
      index++
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      // If we are at the end of the list of questions, pass control to endHandler(). If not, run questionHandler (which will producte a new result, because we updated the index).
      break;
    case 'pushScore':
      console.log('Submitting high score')
      //get the name from the form field
      let elem = document.forms[0].elements.myName
      name = elem.value

      // Create a new high score object
      newHighScore = new highScore(name, myScore, time)
      scores.push(newHighScore) //add it to the array of scores
      highScoreHandler() //pass control to highScoreHandler()
      break;
    default:
      break;
  }
}

/* A preface to the next 3 functions:

quizHandler and questionHandler are basically glorified wrapper functions. 

quizHandler exists because (1) I needed a placeholder function before I knew how the quiz would actually work and (2) it ensures the timer is only started when the quiz is started from the "Start the Quiz" button, since it is called once, by that button, and then questionHandler is called directly from buttonHandler to advance the questions. For those of you who get nervous about clean code, that interval will, in the end, be cleared, by endHandler.

questionHandler does nothing at all besides pass a certain item from list_of_questions to questionDisplayer. Given "index" is a global variable, the entire function could be bypassed by just calling questionDisplayer with list_of_questions[index] instead of thingWePassedFromQuestionHandler. However, doing it this way makes the logic within both buttonHandler and questionDisplayer look ever so slightly prettier.

questionDisplayer does the hard work around here, and will be fully explained inline in its comments

*/

function quizHandler() {
  console.log('Quiz handler was called')
  //Start the timer
  myTimer = window.setInterval(timerUpdater, 1000)

  //Display the questions
  questionHandler(listOfQuestions)

}

function questionHandler(list_of_questions) {
  console.log(`Question handler was called with arg ${list_of_questions}`)
  questionDisplayer(list_of_questions[index], 'quiz')

}

function questionDisplayer(question, elementID) {
  console.log(question)
  //Given a question object, writes the proper HTML
  // to display that question to the .innerHTML property of the
  // HTML element with id = elementID

  //Construct the proper HTML
  myHTML = `<h1>${question.title}</h1>\n <p>${question.description}</p>\n`

  if (question.answers.length > 0) { //if the question has any answers
    myHTML += `<div class = "text-left">` //align the answers left
    myHTML += `  <ol>\n` //start the list. Newline characters might actually be ignored in HTML? Worthy of further investigation.
    for (let index in question.answers) { //add a button for each answer
      if (index != question.indexOfCorrectAnswer) { //if this is NOT the right answer
        myHTML += `<button type="button" id = "incorrectAnswer" onclick = "buttonHandler('incorrect')" class="btn btn-danger m-1">${question.answers[index]}</button>\n` //make it a button with id incorrectAnswer (unused), and pass control to buttonHandler with arg 'incorrect' when it is pressed
        myHTML += `<br>` //add space between the answers
      }
      else {
        myHTML += `<button type="button" id = "correctAnswer" onclick = "buttonHandler('correct')" class="btn btn-danger m-1">${question.answers[index]}</button>\n` //make it a button with id correctAnswer (unused), and pass control to buttonHandler with arg 'correct' when it is pressed
        myHTML += `<br>`
      }
    }
    myHTML += `  </ol>` //close the list and div
    myHTML += `</div>`
  }
  document.getElementById(elementID).innerHTML = myHTML //write the whole list to the doc
}

//highScoreHandler()

/* This function was written to solve an interesting problem:

How, if you don't know that local storage exists, do you preserve high scores when the user clicks through to a separate high score page?

The problem was solved as follows: https://i.imgur.com/e3dwtTN.jpg

*/

function highScoreHandler(){
  console.log('highScoreHandler called') //for debugging

  //Write the whole high score page to the current page
  document.body.innerHTML = `  <div class="row mt-3">
    <div class="ml-5 col text-left">
      <a onclick="quizWrapper()" id="backToQuiz" class="btn btn-primary">Return to Quiz</a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Time Remaining</th>
          </tr>
        </thead>
        <tbody id = "myTable">
        </tbody>
      </table>
    </div>
    <div class="col-md-2"></div>
  </div>`

  //Write each high score currently in scores to the current page (which has now been rewritten so that it is the high score page)

  let newHTML = ''
  scores.sort(function(obj1,obj2){ //sort scores array

    //if -1 is returned, obj1 goes before obj2
    console.log(`Score 1: ${obj1.score}`)
    console.log(`Score 2: ${obj2.score}`)
    if (parseInt(obj1.score) >= parseInt(obj2.score)){ //if obj1.score is more, obj1 goes first
      console.log(`${obj1.score} goes first`)
      return -1
    }else{
      console.log(`${obj2.score} goes first`)
      return 1
    }
    //if 1 is returned, score2 goes before score1
  })

  console.log(scores) //make sure we sorted it RIGHT

  //because we do things RIGHT on this website

  for (let index in scores) {
    //actually get down to the business of writing the scores to the table
    console.log(`Writing ${scores[index].name}'s score to the table`)
    newHTML += `<tr>\n
            <th scope="row">${parseInt(index)+1}</th>\n
            <td>${scores[index].name}</td>\n
            <td>${scores[index].score}</td>\n
            <td>${scores[index].time}</td>\n
          </tr>\n`
  }

  document.getElementById('myTable').innerHTML = newHTML
  //This was written before I really had a handle on createElement() (or event listeners, for that matter), so all the HTML that gets written is done as strings written to innerHTML
}

// End of quiz handler function, called by buttonHandler when an answer button is pressed and global index variable == length of global questions array
function endHandler(){
  console.log('endHandler was called')
  window.clearInterval(myTimer) //stop updating the timer
  document.getElementById('time').innerHTML = `Time Remaining: ${Math.floor(time / 60)} minutes ${time % 60} seconds` //write the stopped time to the timer text

  //assemble the HTML for the 'quiz is over' screen
  let endMessage = `<div class = "text-center">\n <h1>Looks like the quiz is over!</h1>\n <p>Your final score is ${myScore}. ` 
  if(time>0){
    endMessage += `You completed the quiz with ${Math.floor(time / 60)} minutes ${time % 60} seconds of time remaining. </p>\n </div>`
  }
  else{
    endMessage += `You ran out of time! </p>\n </div>`
  }
  endMessage += `<br>`
  endMessage += `<form>
  <div class="form-group">
    <label for="exampleInputPassword1">Enter a name for the high score table</label>
    <input type="text" name="myName" class="form-control" id="nameForTable" placeholder="Tom Bombadil">
  </div>
  <button type="button" onclick = "buttonHandler('pushScore')" class="btn btn-primary">Submit</button>
</form>` //pushScore will pass control to buttonHandler, which will in turn pass it to highScoreHandler

  //write all that HTMl to the quiz space on the screen
  document.getElementById('quiz').innerHTML = endMessage
}

//updates the timer
function timerUpdater() {
  time--
  document.getElementById('time').innerHTML = `Time Remaining: ${Math.floor(time/60)} minutes ${time%60} seconds`
  console.log("Time updated")
  if (time == 0){
    endHandler()
  }
}