'use strict';
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint prefer-const: 0 */
/* eslint arrow-parens: 0 */
/* eslint no-restricted-syntax: 0 */

// Game flow Day 1:
// 1. Greet the user.
// 2. Ask the user name.
// 3. Ask whether he wants to play.
// 4. Yes => Start loop with questions
// 4.1. Do you believe my full name is Aleksandr Vladimirovich?
// 4.2 I like motocycles. And all of those I had were - Harley-Davidson. Do you believe it?
// 4.3 I'm from Russia. And in Russia it's forbidden to talk during the class hours. And those who violate this order are expelled from school after a second official warning?
// 4.4 I went to Tibet. And climbed Everest - the North Face of it.
// 4.5 I came to the USA in a middle of 2016. And worked in 10 different states, including Texas, Massachusetts, Colorado, California, New York, Nevada and North Carolina. Do you believe it?
// 5. No => Sorry for inconvenience, the other parts of the page is under construction. So would you like to play?

// Page flow Day 2:
// +(content) add unordered list of my working experience
// +(content) add ordered list of my top places I wanted to visit
// (style) add background to the page
// (style) orginize fact concisely on the layout
// + (engine) add a question with controlled numeric input; four opps to answer; with tips whether the answer is too high or too low
// (engine) add a question with multiple correct answers stored in array; six tries to get any correct answer; with a rigth answers displayed whether the user guessed right or attempts exhausted
// +(engine) add final message with total number of questions answered correctly

// Greet and ask for the user name
var userName = prompt('My name is Alex. What is your name?');
alert('Hello ' + userName + '. I\'d like to offer you play a guessing game.');
console.log('The user entered: ' + userName);

// questions' pool
var questNumeric = 'What is the meaning of life if it\'s filled with surprises?';
var questMultiCorrect = 'What country besides the USA and Russia I\'ve been?';
var questions = ['Do you believe my full name is Aleksandr Vladimirovich?',
  'I like motocycles. And all of those I had ' +
'were - Harley-Davidson. Do you believe it?',
  'I\'m from Russia. And in russian schools it\'s forbidden to talk during the class ' +
'hours. And those who violate this rule are expelled from school after a ' +
'second official warning?', 'I went to Tibet. And climbed Everest - the North Face of it. Do you think it\'s true?',
  'I came to the USA in a middle of 2016. Since than I\'ve worked in 10 ' +
'different states, including Texas, Massachusetts, Colorado, California, ' +
'New York, Nevada and North Carolina. Do you believe it?'];

var answerTrue = 'You are correct!';
var answerFalse = 'It\'s not correct!';
var answerHigh = 'Too high!';
var answerLow = 'Too low!';
var attemptsExhausted = 'Exhausted all attempts!';
var possibleInput = ['yes', 'y', 'yep', 'no', 'n', 'nop'];
var correctAnswer = ['y', 'n', 'n', 'n', 'n'];

// answers' pool
var answers = ['It\'s indeed long. I mean first + ' +
'middle together are \'Aleksandr Vladimirovich\'.', 'They were BMW.',
'Russian schools are stricter then schools in the USA. ' +
'But not such strict.', 'I was in Tibet and I was at the Everest\'s base camp, ' +
'but I\'m not an alpinist and never climbed big mountains.', 'I\'ve worked only in Greater Seattle area.'];
var answerMultiCorrect = [
  'Mongolia',
  'Spain',
  'China',
  'Italy',
  'France',
  'Switzerland',
  'Netherlands'
];
var meaningLife = 42;
var answerNumeric = meaningLife + Math.floor(Math.random() * meaningLife);
var correctAnswersCounter = 0;

// UI part
// block of yes/no questions
function checkAlert(question, index, answers) {
  console.log('The user guess for the ' + (index + 1) + ' question: ' + userInput);
  if (userInput.slice(0, 1) === correctAnswer[index]) {
    alert(answerTrue + ' ' + answers[index]);
    correctAnswersCounter += 1;
  } else {
    alert(answerFalse + ' ' + answers[index]);
  }
}

function validateInput(userInput) {
  return possibleInput.includes(userInput);
}

for (var i = 0; i < answers.length; i++) {
  var userInput;
  var inputValid = false;
  while (!inputValid) {
    userInput = prompt(questions[i]).toLowerCase();
    inputValid = validateInput(userInput);
  }
  checkAlert(userInput, i, answers);
}

// numeric question
function askNumeric() {
  var i = 4;
  console.group();
  console.log('The random answer: ' + answerNumeric);
  do {
    // ask for the number and check input type
    var userInputNumeric = prompt(questNumeric);
    console.log(
      'Expected number, got ' +
        userInputNumeric +
        '. Is it a number: ' +
        !isNaN(Number(userInputNumeric))
    );
    while (isNaN(Number(userInputNumeric))) {
      userInputNumeric = prompt(questNumeric);
      console.log(
        'Expected number, got ' +
          userInputNumeric +
          '. Is it a number: ' +
          !isNaN(Number(userInputNumeric))
      );
    }

    // check whether the user answer is correct
    userInputNumeric = Number(userInputNumeric);
    i -= 1;
    console.log(i + ' steps left');
    if (userInputNumeric > answerNumeric)
      alert(answerHigh + ' Attempts left: ' + i);
    else if (userInputNumeric < answerNumeric)
      alert(answerLow + ' Attempts left: ' + i);
    else if (userInputNumeric === answerNumeric) {
      alert(answerTrue);
      correctAnswersCounter += 1;
      console.log('Answer is correct');
    }
    if (i === 0 && userInputNumeric !== answerNumeric) alert(attemptsExhausted);
  } while (i > 0 && userInputNumeric !== answerNumeric);
  console.groupEnd();
}

// Question with multiple correct answers
function askMultiple() {
  var i = 6;
  do {
    // ask for the country name
    var userInputMultiCorrect = prompt(questMultiCorrect);
    console.log('The user guess for the 7st question: ' + userInputMultiCorrect);

    // check whether the user answer is correct
    i -= 1;
    console.log(i + ' steps left');
    if (answerMultiCorrect.includes(userInputMultiCorrect)) {
      alert(answerTrue);
      correctAnswersCounter += 1;
      i = 0;
      console.log('Answer is correct');
    } else alert(answerFalse + ' Attempts left: ' + i);
  } while (i > 0);
}

askNumeric();
askMultiple();

alert(
  'End of the game! ' +
    userName +
    ', you gave ' +
    correctAnswersCounter +
    ' correct answers out of 7. Congrats!'
);