const questions = [
    {
        question: "Who is often considered the first computer programmer due to her work on Charles Babbage's early mechanical general-purpose computer, the Analytical Engine?",
        answers: [
            { text: "Grace Hopper", correct: false },
            { text: "Ada Lovelace", correct: true },
            { text: "Katherine Johnson", correct: false },
            { text: "Jean Jennings Bartik", correct: false }
        ]
    },
    {   
        question: "What is the name of the first computer virus?",
        answers: [
            { text: "Creeper", correct: false },
            { text: "Elk Cloner", correct: false },
            { text: "Brain", correct: true },
            { text: "ILOVEYOU", correct: false }
        ]
    },
    {
        question: "Who is known as the 'father of the computer' for his conceptual design of the Analytical Engine?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Alan Turing", correct: false },
            { text: "John von Neumann", correct: false },
            { text: "Konrad Zuse", correct: false }
        ]
    },
    {
        question: "What is the name of the first computer mouse?",
        answers: [
            { text: "Xerox Alto", correct: false },
            { text: "ENIAC", correct: false },
            { text: "Trackball", correct: false },
            { text: "Douglas Engelbart", correct: true }
        ]
    },
    {
        question: "Which company did Steve Jobs create after being ousted from Apple in 1985?",
        answers: [
            { text: "Pixar", correct: false },
            { text: "NeXT", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Dell", correct: false }
        ]
    }

];

const questionEelement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionEelement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
     document.querySelectorAll('.quiz .btn').forEach(button => button.style.display = 'none');
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionEelement.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {

        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
});

startQuiz();