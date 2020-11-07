
const quiz = [
    {
        q: 'რამდენი თვეა წელიწადში ? ',
        options: ['1', '21', '12', '5'],
        answer: 2
    },
    {
        q: 'რაფერის არის ბანანი ?',
        options: ['წთელი', 'ყვითელი', 'მწვანი', 'ლურჯი'],
        answer: 1
    },
    {
        q: 'რამდენი საათია დღე-ღამეში ?',
        options: ['2', '12', '14', '24'],
        answer: 3
    },
    {
        q: '2 + 2 =',
        options: ['4', '2', '1', '12'],
        answer: 0
    },
    {
        q: 'როდის დავიბადე მე ;) ',
        options: ['1999', '1970', '2002', '2003'],
        answer: 0
    },
    {
        q: 'როგორი ბიჭია ავტორი ;) ',
        options: ['ძალიან კარგი', 'ღვთაებრივი', 'საოცარი', 'ყველა პასუხი სწორეა'],
        answer: 3
    }
]


const questionNumber = document.querySelector('.quiestion-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answerIndicatorContainer = document.querySelector('.anwswers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

const inputName = document.querySelector('#inputName');
const inputLastName = document.querySelector('#inputLastName');


let questionCounter = 0;
let currentQuestions;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;



function setAvailableQuestion() {
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++ ) {
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion() {
    questionNumber.innerHTML = "შეკითხვა "  +  quiz.length +" დან "  + (questionCounter + 1);

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestions = questionIndex;
    questionText.innerHTML = currentQuestions.q;
    const index1 = availableQuestions.indexOf(questionIndex);

    availableQuestions.splice(index1,1);
    
    const optionLen = currentQuestions.options.length;
    
    for(let i = 0; i < optionLen; i++){
        availableOptions.push(i);
    }


    optionContainer.innerHTML = '';
    let animationDelay = 0.2;


    for(let i = 0; i < optionLen; i++){
      
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, i);
       

        const option = document.createElement("div");
        option.innerHTML = currentQuestions.options[i];
        option.id = i;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.12;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");

    }


    questionCounter++
    
}

function getResult(element) {
    const id = parseInt(element.id);
    
    if( id === currentQuestions.answer) {
        element.classList.add('correct');

        updateAnswerIndicator("correct");
        correctAnswers++;
       

    } else {
        element.classList.add('wrong');

        updateAnswerIndicator("wrong");

        const optionLem = optionContainer.children.length;
        for(let i = 0; i < optionLem; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestions.answer){
                optionContainer.children[i].classList.add('correct');
            }
        }
    }
    attempt++;
    unclickableOptions();

}

function answerIndicator() {
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++ ){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for(let i = 0; i < optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

 function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
 }


function next() {

    if(questionCounter === quiz.length) {
        quisOver();
    } else {
        getNewQuestion();
    }
 
}

function quisOver() {
    quizBox.classList.add("hide");
    
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    // resultBox.querySelector(".your-name").innerHTML = saveName;
    // resultBox.querySelector(".your-lastname").innerHTML = saveLastName;

    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() + " %";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;

}

function resetQuiz() {

    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}


function tryAgain() {
 
    resultBox.classList.add("hide");
    quizBox.classList.add("hide");

    homeBox.classList.remove("hide");
    resetQuiz();
    // startQuiz()    
    inputLastName.value = '';
    inputName.value = '';
}


function goToHome() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
    inputLastName.value = '';
    inputName.value = '';
}

function startQuiz() {

const saveName = inputName.value;
const saveLastName = inputLastName.value;

console.log(saveName)
console.log(saveLastName)

resultBox.querySelector(".your-name").innerHTML = saveName;
    resultBox.querySelector(".your-lastname").innerHTML = saveLastName;
    
    if( inputLastName.value < 2 || inputName.value < 2 ){
        inputLastName.style.border = "1px solid red";
        inputName.style.border = "1px solid red";
    }  else {
        homeBox.classList.add("hide");

        quizBox.classList.remove("hide");
    
        setAvailableQuestion();
        getNewQuestion();
        answerIndicator();
    }


    
}



window.onload = function() {
    document.querySelector('.total-question').innerHTML = quiz.length;
}