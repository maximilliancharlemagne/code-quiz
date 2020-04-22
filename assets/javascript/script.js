// a javascript file
function quizWrapper(){
  //Handles the start of the quiz

  //Initialize some variables
  let startQuiz = false

  //Display the starting screen: just a "start the quiz" button for now
  document.getElementById('quiz').innerHTML = '<button type="button" id="startBtn" class="btn btn-danger">Start the Quiz!</button>'

  //Write an event listener to listen to when the "Start the Quiz!" button is clicked
  document.getElementById("startBtn").addEventListener("click", buttonHandler('start'));
}


function questionDisplayer(question,elementID){
  //Given a question object, writes the proper CSS
  // to display that question to the .innerHTML property of the
  // HTML element with id = elementID

  //Construct the proper CSS
  css = `<h1>${question.title}</h1>\n <p>${question.description}</p>\n`

  for (let index in question.answers){
  }
  //document.getElementById(elementID) = `<h1>${question.title}</h1>\n <p>${question.description}</p>\n`

  /*
    Make the CSS template

    h1 question.title
    p question.description
    ol
      for index in question.answers
      li question.answers[index]
    /ol
  */
}

function buttonHandler(buttonType){
  switch (buttonType) {
    case 'start':
      quizHandler()
      break;
  
    default:
      break;
  }
}

function quizHandler(){
  //Make a question class
  class question {
    constructor(title, description, arr_of_answers) {
      this.title = title;
      this.description = description;
      this.answers = arr_of_answers;
    }
  }

  //Use the question class to make an object for each question
  const question1 = new question('Question 1', 'Which of the below is a valid keyword for declaring a variable in Javascript?', ['var', 'let', 'const', 'All of the above'])
  const question2 = new question('Question 2', 'What will be the result of the following code?\n let num = 5\n let sum = num + 3\n console.log(sum)', ['3 will be logged to the console', '8 will be logged to the console', '2 will be logged to the console', 'The code will result in an error'])

  //Start the timer

  //Display the first question until it is answered, then display the next question, and so on

  //Once all questions have been answered, display the user's score
}