// linked to start-btn in html
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionsContainer = document.getElementById('questions-container');
var getQuestion = document.getElementById('question');
var answerButtons = document.getElementById('answer-buttons');

var mixQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
// remove, cycle to next questions
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
})
// starts game, removes start button, starts slide of ?'s
function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    mixQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionsContainer.classList.remove('hide');
    nextQuestion()
}
// clears start button, shows next question
function nextQuestion() {
    resetButtons()
    var currentQuestion = mixQuestions[currentQuestionIndex];
    showQuestion(currentQuestion);
}
// 
function showQuestion(question) {
    getQuestion.innerText = question.question;

    question.answer.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
    // es6 fat arrow function 
    // question.answer.forEach(function(answer){
    //     var button = document.createElement('button');
    //     button.innerText = answer.text;
    //     button.classList.add('btn');

    //     if (answer.correct) {
    //         button.dataset.correct = answer.correct;
    //     }
    //     button.addEventListener('click', selectAnswer);
    //     answerButtons.appendChild(button);
    // });

}

function resetButtons() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (mixQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: ('What does Brennan have to call Dale?'),
        answer: [
            { text: 'Nighthawk', correct: true },
            { text: 'Hawkyeye', correct: false },
            { text: 'Nightrider', correct: false },
            { text: 'Sisterchristian', correct: false },
        ]
    },
    {
        question: ('Why was Brennan so sweaty?'),
        answer: [
            { text: 'He was running', correct: false },
            { text: 'He was watching cops', correct: true },
            { text: 'He had the meat sweats', correct: false },
            { text: 'He was learning JavaScript', correct: false },
        ]
    },
    {
        question: ('What type of house does Dale live in?'),
        answer: [
            { text: 'A colonial', correct: false },
            { text: 'A bungalow', correct: false },
            { text: 'A house of learn-ed doctors', correct: true },
            { text: 'A ranch', correct: false },
        ]
    },
    {
        question: ('What happens when Dale and Brennan build bunkbeds?'),
        answer: [
            { text: 'They have chicks over', correct: false },
            { text: 'They get into fistycuffs', correct: false },
            { text: 'They do the dougie', correct: false },
            { text: 'They have so much room for activities', correct: true },
        ]
    },
    {
        question: ('What happens in Catalina?'),
        answer: [
            { text: 'The Catalina Rum Runner', correct: false },
            { text: 'The Catalina Whiskey Chaser', correct: false },
            { text: 'The Catalina Beerfest', correct: false },
            { text: 'The Catalina Wine Mixer', correct: true },
        ]
    },
]