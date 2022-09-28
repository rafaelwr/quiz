const questionsBox = document.querySelector('#questions-box');
const answersBox = document.querySelector('#question-answers');
const questionsResult = document.querySelector('#questions-result');
const resetQuiz = document.querySelector('#reset-quiz');
const letters = ['a', 'b', 'c', 'd'];
let points;
let actualQuestion;

const questions = [
    {
        'question': 'Quem desenvolveu o primeiro trabalho de linguagem de programação?',
        'answers': [
            {
                'answer': 'Charles Babbage',
                'correct': false
            },
            {
                'answer': 'Ada Lovelace',
                'correct': true
            },
            {
                'answer': 'Grace Hopper',
                'correct': false
            },
            {
                'answer': 'Alan Turing',
                'correct': false
            },
        ]
    },
    {
        'question': 'Qual foi a primeira linguagem de programação de alto nível amplamente utilizada e que foi criada em 1954?',
        'answers': [
            {
                'answer': 'Cobol',
                'correct': false
            },
            {
                'answer': 'Pascal',
                'correct': false
            },
            {
                'answer': 'Fortran',
                'correct': true
            },
            {
                'answer': 'Algol',
                'correct': false
            },
        ]
    },
    {
        'question': 'Em qual década foi criado o COBOL?',
        'answers': [
            {
                'answer': '1970',
                'correct': false
            },
            {
                'answer': '1980',
                'correct': false
            },
            {
                'answer': '1950',
                'correct': true
            },
            {
                'answer': '1960',
                'correct': false
            },
        ]
    },
    {
        'question': 'Qual foi a primeira linguagem de programação a oferecer suporte completo para a Orientação à Objetos?',
        'answers': [
            {
                'answer': 'C++',
                'correct': false
            },
            {
                'answer': 'Smalltalk',
                'correct': true
            },
            {
                'answer': 'Java',
                'correct': false
            },
            {
                'answer': 'Object Pascal',
                'correct': false
            },
        ]
    }
]

function init() {
    points = 0;
    actualQuestion = 0;

    createQuestion(actualQuestion);
}

function createQuestion(i) {
    let questionTitle = questionsBox.querySelector('#question-title h3');

    questionTitle.textContent = questions[i].question;

    // Limpar respostas
    let actualAnswers = questionsBox.querySelectorAll('.answer');
    
    actualAnswers.forEach(function(answer) {
        answer.remove();
    });

    questions[i].answers.forEach(function(obj, index) {
        const answerTemplate = answersBox.querySelector('.answer-template');
        const answer = answerTemplate.cloneNode(true);

        const answerLetter = answer.querySelector('.letter');
        const answerText = answer.querySelector('.answer-text');
        
        answerLetter.textContent = letters[index];
        answerText.textContent = obj.answer;

        answer.classList.add('answer');
        answer.classList.remove('answer-template');
        answer.classList.remove('hide');

        answer.setAttribute('correct-answer', obj.correct);

        answer.addEventListener('click', function() {
            checkAnswer(obj.correct);
        });

        answersBox.appendChild(answer);
    });

    actualQuestion++;
}

function checkAnswer(correct) {
    if(correct) {
        points++;
    }

    let answers = answersBox.querySelectorAll('.answer');

    answers.forEach(function(obj) {
        if(obj.getAttribute('correct-answer') == 'true') {
            obj.classList.add('correct');
        }else{
            obj.classList.add('wrong');
        }
    });

    setTimeout(function() {
        console.log(actualQuestion, questions.length);
        if(actualQuestion < questions.length){
            createQuestion(actualQuestion);
        }else{
            showResult();
        }
    }, 1);
}

function showResult() {
    let percentageText = questionsResult.querySelector('#percentage');
    let pointsText = questionsResult.querySelector('#qty-corrects');
    let questionsText = questionsResult.querySelector('#qty-questions');

    percentageText.textContent = ((100 / questions.length) * points) + '%';

    pointsText.textContent = points;
    questionsText.textContent = questions.length;

    questionsBox.classList.toggle('hide');
    questionsResult.classList.toggle('hide');
}

// Create reset event
resetQuiz.addEventListener('click', function() {
    questionsBox.classList.toggle('hide');
    questionsResult.classList.toggle('hide');

    init();
});

init();