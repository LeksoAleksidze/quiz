
const quiz = [
    {
        q: '3 ქათამი სამ დღეში 3 კვერცხს დებს. რამდენ კვერცხს დადებს 12 ქათამი 12 დღეში? ',
        options: ['46', '27', '48', '15'],
        answer: 2
    },
    {
        q: ' თუ ღამის 12 საათზე მოდის წვიმა, შეგვიძლია თუ არა 72 საათის შემდეგ ველოდოთ მზიან ამინდს?',
        options: ['დიახ', 'არა',],
        answer: 1
    },
    {
        q: 'ერთი მეცნიერის წიგნის თაროზე დევს ორი წიგნი. პირველი წიგნი დგას მეორის მარცხნივ მის გვერდით. პირველ წიგნში 230 გვერდია, მეორეში 325. როგორ ფიქრობთ, რამდენი გვერდია პირველი წიგნის პირველ გვერდსა და მეორე წიგნის ბოლო გვერდს შორის?',
        options: ['123', '2', '3', 'არცერთი პასუხი არაა სწორე'],
        answer: 3
    },
    {
        q: 'ჭრიჭინა, მთელი ზაფხულის მანძილზე, დღე-ღამის ნახევარს ძილში ატარებდა, დღე-ღამის მესამედს – ცეკვავდა, ხოლო მეექვსედ დროს - მღეროდა. დანარჩენ დროს ზამთრისთვის ემზადებოდა. დღე-ღამის რა დროს ხარჯავდა ჭრიჭინა ზამთრის სამზადისზე?',
        options: ['24 (სთ)', '14 (სთ)', '22 (სთ)', '8 (სთ)'],
        answer: 0
    },
    {
        q: 'რამდენი ფერია ცისარტყელაში ',
        options: ['5', '6', '8', '7'],
        answer: 3
    },
    {
        q: 'ქილა მაგიდაზე ისე იდგა, რომ მისი ერთი ნახევარი მაგიდაზეა, ხოლო მეორე - ჰაერში იყო. ის მაგიდიდან ნახევარი საათის შემდეგ ჩამოვარდა რა იყო ქილაში და რატომ ჩამოვარდა ის, მხოლოდ გარკვეული დროის შემდეგ? ',
        options: ['თაფლი', 'ყინული', 'წყალი', 'არცერთი პასუხი არაა სწორე'],
        answer: 1
    },
    {
        q: '10 + ( 10 * 2 ) / ( 10 / 2 ) = ',
        options: ['14', '26', '18', '5'],
        answer: 0
    },   
    {
        q: 'ქეთის მამას 7 ქალიშვილი ჰყავდა და არცერთი ვაჟი. 6 გოგონას ერქვა: ნანა, ნენე, ნინი, ნინო, ნუნუ, ნონა. რა ერქვა მეშვიდე შვილს?',
        options: ['ნინია', 'ნანუ', 'ნინა', ' ჩამონათვალში არ არის მისი სახელი.'],
        answer: 2
    },    
    {
        q: 'ფერმერს 19 ძროხა ჰყავდა და 9-ის გარდა ყველა მოუკვდა. რამდენი ძროხა დარჩა?',
        options: ['7', '8', '9', '10'],
        answer: 2
    },
    {
        q: 'ალპინისტი თოკით დაეშვა 100 მეტრი სიმაღლის მთიდან, მინიმუმ რამდენი მეტრი თოკი უნდა ქონოდა ალპინისტს?',
        options: ['110', '90', 'შეუძლებელია პასუხის გაცემა', '100'],
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
const finishBox = document.querySelector('.finish-box');

const nickName = document.querySelector('.total-nickname');

const inputName = document.querySelector('#inputName');
const inputLastName = document.querySelector('#inputLastName');


const imgQuestion = document.querySelector('#imgQuestion');


const timer = document.querySelector('.timer');



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
        option.setAttribute("onclick","getResult(this)");
        optionContainer.appendChild(option);
       

    }


    questionCounter++
    
}



function getResult(e) {
    const id = parseInt(e.id);
    
    if( id === currentQuestions.answer) {
        e.classList.add('correct');

        updateAnswerIndicator("correct");
        correctAnswers++;
       

    } else {
        e.classList.add('wrong');

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
    clearInterval(cleartInt);
    quizBox.classList.add("hide");
    
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
      
    let nickRandom;

    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() + " %";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
   
     if( percentage < 30) {
        nickRandom = "შეეშვი გამოცანებს";
     }  else if (percentage > 30 && percentage < 50) {
        nickRandom = "თავსატეხა";
     } else if (percentage >= 50 && percentage < 80 ) {
        nickRandom = "ჭკვინკო";
     } else if (percentage >= 80 && percentage < 100) {
        nickRandom = "ტვინკო";
     } else if (percentage === 100) {
        nickRandom = "შერლოკა";
     }

    resultBox.querySelector(".total-nickname").innerHTML = nickRandom;

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

    inputLastName.value = '';
    inputName.value = '';
    window.location.reload();
}


function goToHome() {
    resultBox.classList.add("hide");
    homeBox.classList.add("hide");
    finishBox.classList.remove('hide')
    resetQuiz();
}


const startMin = 1;
let time = startMin * 60;
let cleartInt;

function startTimer() {

     let minute = Math.floor(time / 60);
     let seconds = time % 60;
      timer.innerHTML = `0  ${minute} : ${seconds}`;
     time--;
     if( time < 10){
         timer.style.color = "red";
         timer.classList.add('alert-fade');
        
     } 
      if(time < 0){

        swal("თქვენი დრო ამოიწურა! იხილეთ შედეგი");
        quisOver()
        clearInterval(cleartInt);
     }


}



function startQuiz() {

const saveName = inputName.value;
const saveLastName = inputLastName.value;

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
        cleartInt = setInterval(startTimer,1000);
    }


    
}




window.onload = function() {
    document.querySelector('.total-question').innerHTML = quiz.length;
}