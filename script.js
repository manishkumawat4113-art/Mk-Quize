const startBtn =document.querySelector("#startBtn");
const quizScreen =document.querySelector("#quizScreen");
const startScreen =document.querySelector("#startScreen");
const question =document.querySelector("#question");
const optionsContainer =document.querySelector("#optionsContainer");
const questionNumber =document.querySelector("#questionNumber");
const totalQuestions =document.querySelector("#totalQuestions");
const nextBtn =document.querySelector("#nextBtn");
const resultScreen =document.querySelector("#resultScreen");
const score =document.querySelector("#score");
const percentage =document.querySelector("#percentage");
const highScore =document.querySelector("#highScore");
const restartBtn =document.querySelector("#restartBtn");
const progressBar =document.querySelector("#progressBar");
const fillBtn =document.querySelector("#fillBtn");
const form =document.querySelector("#form");
const addQuestionBtn =document.querySelector("#addQuestionBtn");
const questionInput =document.querySelector("#questionInput");
const option1 =document.querySelector("#option1");
const option2 =document.querySelector("#option2");
const option3 =document.querySelector("#option3");
const option4 =document.querySelector("#option4");
const correctAnswer =document.querySelector("#correctAnswer");
const totalCount =document.querySelector("#totalCount");
const questionCount =document.querySelector("#questionCount");
const startBtn1 =document.querySelector("#startBtn1");
const leavebtn =document.querySelector("#leavebtn");
const watchbtn =document.querySelector(".delBtn");
let questionTasks=JSON.parse(localStorage.getItem("tom"))||[]
const questionModal = document.querySelector("#questionModal");
const questionText = document.querySelector("#questionText");
const closeModal = document.querySelector("#closeModal");
const timer =document.querySelector("#timer");
let currentNumber=0
let selectedAnswer=null
let totalScore=0
let timeLeft = 15
let timerId = null
let mk=false
let normalQuestions = [
{question:"Which language is mainly used to make web pages interactive?",
     options: ["HTML","CSS","JavaScript","SQL"],
     answer: "JavaScript"
    },
{question:"Which method selects the first matching element?",
    options: ["querySelector()","getAll()",
            "selectFirst()","findElement()"],
    answer: "querySelector()"
    },
{question:"Which method adds an item to the end of an array?",
    options: ["pop()","push()","shift()","add()"],
    answer: "push()"
    },
{question:"Which method creates a new array containing elements that pass a condition?",
    options: ["filter()","find()",
            "forEach()","sort()"],
    answer: "filter()"},
{question:"Which storage can save data in the browser?",
    options: ["localStorage","serverStorage",
            "browserDBOnly","sessionFile"
        ],
    answer: "localStorage"
    },
{question:"Which event occurs when a button is clicked?",
    options: ["hover","change","click","press"],
    answer: "click"
    },
{question:"Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var","let","const","static"],
        answer: "let"
    },
{question:"Which method converts JSON text into a JavaScript object?",
    options: ["JSON.parse()","JSON.object()",
             "JSON.convert()","JSON.read()"],
        answer: "JSON.parse()"
    },
{question:"Which method runs a function for every array element?",
    options: ["forEach()","each()",
            "loop()","repeat()"],
    answer: "forEach()"
},
{question:"Which function can repeatedly execute code after a fixed time interval?",
    options: ["setTimeout()","setInterval()",
            "repeatCode()","runEvery()"],
    answer: "setInterval()"
    }
];
totalQuestions.textContent=normalQuestions.length

function showQuestion(){
     clearInterval(timerId);
    nextBtn.disabled=true
    selectedAnswer = null;
    questionNumber.textContent=currentNumber+1
     const currentQuestions = mk ? questionTasks : normalQuestions;
        question.textContent=`${currentQuestions[currentNumber].question}`
        optionsContainer.innerHTML=""
        currentQuestions[currentNumber].options.forEach(function(x){
            const button=document.createElement("button")
            button.className="option"
            button.type = "button";
            button.textContent=x
            button.addEventListener("click",function(){
                selectAnswer(button,x)
            })
            optionsContainer.append(button)
        })
    updateProgress()
}
function selectAnswer(selectedButton,answer){
    if(selectedAnswer!==null){
        return
    }
    selectedAnswer=answer
     const currentQuestions = mk ? questionTasks : normalQuestions;

    const currentQuestion =currentQuestions[currentNumber]
     const allOptions=document.querySelectorAll(".option")
    allOptions.forEach(function(button){
        button.disabled = true;
    })
    selectedButton.classList.add(
        "selected"
    );
    if(answer===currentQuestion.answer){
        selectedButton.classList.add("correct");
        totalScore++
    }else{
        selectedButton.classList.add(
            "wrong"
        );
    }
    nextBtn.disabled = false;
     clearInterval(timerId);
}
function startTimer() {
    timeLeft = 15;
    updateTimer();
    timerId = setInterval( function () {
                timeLeft--;
                updateTimer();
 if (timeLeft <= 0) {
 clearInterval(timerId);
                  timeUp();
                }
            },  1000 );
}
function updateTimer() {
    timer.textContent =
        `⏱️ ${timeLeft}`;
}
function timeUp() {
    if (selectedAnswer !== null) {
        return;
    }
    selectedAnswer = "TIME_UP";
    const currentQuestion = questions[currentQuestionIndex];
   const allOptions =document.querySelectorAll( ".option"  );
  allOptions.forEach(function (button) {
       button.disabled = true;
 if (button.textContent ===currentQuestion.answer ) {
  button.classList.add( "correct" );
 }
}      );
    nextBtn.disabled = false;
}
function nextQuestion(){
     if (selectedAnswer === null) {
          return;
    }
    currentNumber++
     const currentQuestions = mk ? questionTasks : normalQuestions;
    if(currentNumber>=currentQuestions.length){
        finishQuiz();
        return;
    }
    showQuestion()
}
function finishQuiz(){
     clearInterval(timerId);
      const currentQuestions = mk ? questionTasks : normalQuestions;
    quizScreen.classList.add("hidden")
        resultScreen.classList.remove("hidden")
      score.textContent=`${totalScore}/${currentQuestions.length}`
     percentage.textContent=Math.round((totalScore/currentQuestions.length)*100)+"%"
     if(mk){
          saveHighScore1(totalScore);
          showHighScore1();
     }else{
     saveHighScore(totalScore);
    showHighScore();
     }
}
function saveHighScore1(currentScore){
    let oldScore =Number(localStorage.getItem("quizHighScore1")) || 0;
    if(currentScore>oldScore){
        localStorage.setItem("quizHighScore1",currentScore)
    }
}
function showHighScore1(){
    const highScore1=Number(localStorage.getItem("quizHighScore1"))||0
    highScore.textContent=highScore1
}
function saveHighScore(currentScore){
    let oldScore =Number(localStorage.getItem("quizHighScore")) || 0;
    if(currentScore>oldScore){
        localStorage.setItem("quizHighScore",currentScore)
    }
}
function showHighScore(){
    const highScore1=Number(localStorage.getItem("quizHighScore"))||0
    highScore.textContent=highScore1
}
nextBtn.addEventListener("click",function(){
    nextQuestion()
})
function updateProgress(){
     const currentQuestions = mk ? questionTasks : normalQuestions;
    const progress=(currentNumber/currentQuestions.length)*100
    progressBar.style.width =`${progress}%`;
}

function startQuiz(){
    currentNumber=0
    totalScore=0
    selectedAnswer=null
     const currentQuestions = mk ? questionTasks : normalQuestions;
    totalQuestions.textContent = currentQuestions.length;
    if(mk){
        form.classList.add("hidden")  
     }
    startScreen.classList.add("hidden")
    quizScreen.classList.remove("hidden")
    showQuestion()
}

startBtn.addEventListener("click",function(){
    mk = false;
     startQuiz()
})
restartBtn.addEventListener("click",function(){
        resultScreen.classList.add("hidden")
    startQuiz()
})
function saveTask(){
    localStorage.setItem("tom",JSON.stringify(questionTasks))
}
addQuestionBtn.addEventListener("click",function(){
    Task={
        question:questionInput.value,
        options:[option1.value.trim().toUpperCase(),
         option2.value.trim().toUpperCase(),
        option3.value.trim().toUpperCase(),
        option4.value.trim().toUpperCase()],
         answer:correctAnswer.value
    }  
     Task.answer=Task.options[correctAnswer.value - 1];
     if(questionInput.value===""){
          return
     }
    questionTasks.push(Task)
     saveTask()
     totalCount.textContent=questionTasks.length
     questionCount.textContent=questionTasks.length+1
     form.reset()
})

fillBtn.addEventListener("click",function(){
    startScreen.classList.add("hidden")
    resultScreen.classList.add("hidden")
     totalCount.textContent=questionTasks.length
     questionCount.textContent=questionTasks.length+1
    form.classList.remove("hidden")
})
startBtn1.addEventListener("click",function(){
     mk=true
    startQuiz()
})
leavebtn.addEventListener("click",function(){
    mk=false
     quizScreen.classList.add("hidden")
     startScreen.classList.remove("hidden")
    currentNumber = 0;
    selectedAnswer = null;
})
function delbtn(){
     questionTasks=[]
saveTask()
     totalCount.textContent=questionTasks.length
     questionCount.textContent=questionTasks.length+1
}
watchbtn.addEventListener("click",function(){
     mk=true
     watchBtn()
})
function watchBtn(){
     let temp=""
    const currentQuestions=mk?questionTasks:normalQuestions
currentQuestions.forEach(function(x, index){
temp+=
     `Question ${(index + 1)}:\n\n${x.question}\n\nA.${x.options[0]}\nB.${x.options[1]}\nC.${x.options[2]}\nD.${x.options[3]}--------------------\n\n`
});
questionText.textContent = temp;
     questionModal.classList.remove("hidden");
     questionModal.addEventListener("click", function(event){
          if(event.target===questionModal||event.target===closeModal){
          questionModal.classList.add("hidden");
    }
});
}
showHighScore()
