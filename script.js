// Questions and answers
const Questions = [
    "What does CSS stand for?",
    "Which HTML tag is used to define an internal style sheet?",
    "How do you call a function named 'myFunction' in JavaScript?",
    "What is the correct syntax to include an external JavaScript file?",
    "Which property is used to change the background color in CSS?",
    "What is the correct HTML element for the largest heading?",
    "Which JavaScript method is used to write to the browser's console?",
    "How do you add a comment in CSS?",
    "Which HTML attribute is used to define inline styles?",
    "How can you access the first element with the class 'example' in JavaScript?"
];

const Answers = [
    ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    ["<style>", "<script>", "<css>", "<link>"],
    ["call myFunction()", "myFunction()", "call function myFunction", "execute myFunction()"],
    ["<script href='script.js'>", "<script src='script.js'>", "<script file='script.js'>", "<script link='script.js'>"],
    ["color", "bgcolor", "background-color", "background"],
    ["<head>", "<heading>", "<h6>", "<h1>"],
    ["console.write()", "console.log()", "console.output()", "console.display()"],
    ["// This is a comment", "' This is a comment", "/* This is a comment */", "<!-- This is a comment -->"],
    ["font", "style", "class", "id"],
    ["document.getElementById('example')", "document.querySelector('.example')", "document.getElement('example')", "document.getClass('example')"]
];

const correctAnswers = [0, 0, 1, 1, 2, 3, 1, 2, 1, 1];

// Function to get 5 random questions
function getRandomQuestions() {
    const selectedQuestions = [];
    const selectedIndexes = [];

    while (selectedQuestions.length < 5) {
        let randomIndex = Math.floor(Math.random() * Questions.length);
        
        if (!selectedIndexes.includes(randomIndex)) {
            selectedIndexes.push(randomIndex);
            selectedQuestions.push({
                question: Questions[randomIndex],
                answers: Answers[randomIndex],
                correct: correctAnswers[randomIndex]
            });
        }
    }

    return selectedQuestions;
}

// Initialize game variables
let currentQuestionIndex = 0;
let score = 0;
const randomQuestions = getRandomQuestions();

// Select necessary HTML elements
const questionText = document.querySelector('.question');
const choices = document.querySelectorAll('.choices');
const scoreText = document.querySelector('.score');
const numberOfQuestions = document.querySelector('.numberOfQuestions');
const progressBar = document.querySelector('.progress'); 
const scoreModal = document.getElementById('scoreModal'); 
const finalScoreText = document.getElementById('finalScore'); 
const closeModal = document.getElementById('closeModal'); 
const restartQuizButton = document.getElementById('restartQuiz'); 

// Function to show the current question and answers
function showQuestion() {
    const currentQuestion = randomQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Replace forEach with a for loop
    for (let i = 0; i < choices.length; i++) {
        choices[i].querySelector('.choiceText').textContent = currentQuestion.answers[i];
        choices[i].classList.remove('correct', 'incorrect');
    }
    
    numberOfQuestions.textContent = `${currentQuestionIndex + 1}/5`;
}

// Function to handle user's choice and move to the next question
for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', function() {
        const currentQuestion = randomQuestions[currentQuestionIndex];
        const selectedAnswer = i;

        // Change the background color based on whether the answer is correct or not
        if (selectedAnswer === currentQuestion.correct) {
            score += 10; 
            choices[selectedAnswer].classList.add('correct'); 
        } else {
            choices[selectedAnswer].classList.add('incorrect'); 
            // Show the correct answer
            choices[currentQuestion.correct].classList.add('correct');
        }

        scoreText.textContent = score;

        // Move to the next question
        currentQuestionIndex++;

        // Update the progress bar immediately after selecting an answer
        const progressPercentage = (currentQuestionIndex / 5) * 100; 
        progressBar.style.width = progressPercentage + "%"; 

        if (currentQuestionIndex < randomQuestions.length) {
            setTimeout(showQuestion, 1000);
        } else {
            // Set the progress bar to 100% after the last question
            progressBar.style.width = "100%";
            
            // Show the modal and update the score
            finalScoreText.textContent = score; 
            scoreModal.style.display = "block"; 
        }
    });
}

// Event listener for closing the modal
closeModal.addEventListener('click', function() {
    scoreModal.style.display = "none"; // Hide the modal
});

// Event listener for restarting the quiz
restartQuizButton.addEventListener('click', function() {
    scoreModal.style.display = "none"; // Hide the modal
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = score;
    progressBar.style.width = "0%"; 
    showQuestion(); 
});

// Start the quiz by showing the first question
showQuestion();
