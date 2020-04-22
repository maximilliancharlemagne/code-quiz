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
  const question1 = new question('Question 1','What is your name?',['Adam','Beth','Caleb'])
}


function questionDisplayer(question,elementID){
  //Given a question object, writes the proper CSS
  // to display that question to the .innerHTML property of the
  // HTML element with id = elementID
}