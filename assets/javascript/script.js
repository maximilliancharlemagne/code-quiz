// a javascript file

//Setting up some global variables
let time = 600 //Time (in seconds) the user has remaining for the quiz
let myTimer //timer variable
let index = 0 //What question are we on?
let score = 0 //What is the player's current score?


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

function quizWrapper(){
  console.log('Quiz wrapper activated')
  //Handles the start of the quiz

  //Display the starting screen: just a "start the quiz" button for now
  document.getElementById('quiz').innerHTML = '<button type="button" onclick = "buttonHandler(`start`)" id="startBtn" class="btn btn-danger">Start the Quiz!</button>'

  document.getElementById('time').innerHTML = `Time Remaining: ${Math.floor(time / 60)} minutes ${time % 60} seconds`
}

function buttonHandler(buttonType) {
  console.log(`Button handler called with arg ${buttonType}`)
  switch (buttonType) {
    case 'start':
      console.log('Start button pressed')
      quizHandler(false)
      break;
    case 'incorrect':
      console.log('Incorrect answer')
      score -=10
      time -= 10
      index++
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      break;
    case 'correct':
      console.log('Correct answer')
      score +=10
      index++
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      break;

    default:
      break;
  }
}

function endHandler(){
  console.log('endHandler was called')
  window.clearInterval(myTimer)
  document.getElementById('time').innerHTML = `Time Remaining: ${Math.floor(time / 60)} minutes ${time % 60} seconds`
  let endMessage = `<div class = "text-center">\n <h1>Looks like the quiz is over!</h1>\n <p>Your final score is ${score}. ` 
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
    <input type="text" class="form-control" id="nameForTable" placeholder="Tom Bombadil">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`
  document.getElementById('quiz').innerHTML = endMessage
}

function quizHandler() {
  console.log('Quiz handler was called')
  //Start the timer
  myTimer = window.setInterval(timerUpdater, 1000)

  //Display the questions
  questionHandler(listOfQuestions)

}

function timerUpdater() {
  time--
  document.getElementById('time').innerHTML = `Time Remaining: ${Math.floor(time/60)} minutes ${time%60} seconds`
  console.log("Time updated")
  if (time == 0){
    endHandler()
  }
}

function questionHandler(list_of_questions){
  console.log(`Question handler was called with arg ${list_of_questions}`)
  questionDisplayer(list_of_questions[index],'quiz')

}

function questionDisplayer(question,elementID){
  console.log(question)
  //Given a question object, writes the proper CSS
  // to display that question to the .innerHTML property of the
  // HTML element with id = elementID

  //Construct the proper CSS
  css = `<h1>${question.title}</h1>\n <p>${question.description}</p>\n`
  /*
  To Do

  1. Answers should be buttons, so you can click on them
  */
 
  if (question.answers.length > 0){
    css+=`<div class = "text-left">`
    css+=`  <ol>\n`
    for (let index in question.answers){
      if (index!=question.indexOfCorrectAnswer){
      // css+=`    <li>${question.answers[index]}</li>\n`
      css += `<button type="button" id = "incorrectAnswer" onclick = "buttonHandler('incorrect')" class="btn btn-danger m-1">${question.answers[index]}</button>\n`
      css += `<br>`
      }
      else{
        css += `<button type="button" id = "correctAnswer" onclick = "buttonHandler('correct')" class="btn btn-danger m-1">${question.answers[index]}</button>\n`
        css += `<br>`
      }
    }
    css+=`  </ol>`
    css+=`</div>`
  }
  document.getElementById(elementID).innerHTML = css
}