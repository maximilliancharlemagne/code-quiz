// a javascript file
function quizWrapper(){
  //Handles the whole quiz

  //Display the starting screen: just a "start the quiz" button for now

  //Make a question class
  class question {
    constructor(title,description,arr_of_answers){
      this.title = title;
      this.description = description;
      this.answers = arr_of_answers;
    }
  }
  //Use the question class to make an object for each question
  const question1 = new question('Question 1','Which of the below is a valid keyword for declaring a variable in Javascript?',['var','let','const','All of the above'])
  const question2 = new question('Question 2', 'What will be the result of the following code?\n let num = 5\n let sum = num + 3\n console.log(sum)', ['3 will be logged to the console', '8 will be logged to the console','2 will be logged to the console','The code will result in an error'])
}


function questionDisplayer(question,elementID){
  //Given a question object, writes the proper CSS
  // to display that question to the .innerHTML property of the
  // HTML element with id = elementID
}