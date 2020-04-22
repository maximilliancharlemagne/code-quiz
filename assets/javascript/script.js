// a javascript file

//Setting up some global variables
let time = 0 //Time (in seconds) the user has been taking the quiz, for the timer
let answered = false //Has the user answered this question?
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

//Make a list of all the questions
let listOfQuestions = [question1, question2]

function quizWrapper(){
  console.log('Quiz wrapper activated')
  //Handles the start of the quiz

  //Display the starting screen: just a "start the quiz" button for now
  document.getElementById('quiz').innerHTML = '<button type="button" onclick = "buttonHandler(`start`)" id="startBtn" class="btn btn-danger">Start the Quiz!</button>'

  //Write an event listener to listen to when the "Start the Quiz!" button is clicked
  // document.getElementById("startBtn").addEventListener("click", buttonHandler('start'));
}

function buttonHandler(buttonType) {
  console.log(`Button handler called with arg ${buttonType}`)
  switch (buttonType) {
    case 'start':
      console.log('Start button pressed')
      quizHandler()
      break;
    case 'incorrect':
      console.log('Incorrect answer')
      score -=1
      index++
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      break;
    case 'correct':
      console.log('Correct answer')
      score +=1
      index++
      index == listOfQuestions.length ? endHandler() : questionHandler(listOfQuestions)
      break;

    default:
      break;
  }
}

function endHandler(){
  console.log('endHandler was called')
  document.getElementById('quiz').innerHTML = `<div class = "text-left">\n <h1>Looks like the quiz is over!</h1>\n <p>Your final score is ${score}</p>\n </div>`
}

function quizHandler() {
  console.log('Quiz handler was called')

  //Start the timer
  let myTimer = window.setInterval(timerUpdater, 1000)
  
  //Display the questions
  questionHandler(listOfQuestions)

  //Once all questions have been answered, display the user's score
}

function timerUpdater() {
  time++
  document.getElementById('time').innerHTML = `Time: ${time}`
  console.log("Time updated")
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