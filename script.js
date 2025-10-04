const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
const scoreText = document.getElementById('score')

const questions = [
  {
    question: 'Qual o maior estado do Sul?',
    answers: [
      { text: 'Paraná', correct: false },
      { text: 'Santa Catarina', correct: false },
      { text: 'Rio Grande do Sul', correct: true},
    ]
  },
  {
    question: 'Qual programa usado para criar um servidor web local?',
    answers: [
      { text: 'Hamachi', correct: false },
      { text: 'xampp', correct: true },
      { text: 'RadminVpn', correct: false },
      { text: 'NordVpn', correct: false }
    ]
  },
  {
    question: 'Qual linguagem é usada para dar animações ao site?',
    answers: [
      { text: 'HTML', correct: false },
      { text: 'JavaScript', correct: true },
      { text: 'CSS', correct: false },
      { text: 'Java', correct: false }
    ]
  }
]

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
  currentQuestionIndex = 0
  score = 0
  nextButton.innerText = 'Próxima'
  showQuestion()
}

function showQuestion() {
  resetState()
  let currentQuestion = questions[currentQuestionIndex]
  questionElement.innerText = currentQuestion.question

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.addEventListener('click', () => selectAnswer(answer))
    answerButtons.appendChild(button)
  })
}

function resetState() {
  nextButton.style.display = 'none'
  answerButtons.innerHTML = ''
}

function selectAnswer(answer) {
  const correct = answer.correct
  if (correct) {
    score++
  }
  Array.from(answerButtons.children).forEach(button => {
    const ans = questions[currentQuestionIndex].answers.find(a => a.text === button.innerText)
    button.classList.add(ans.correct ? 'correct' : 'wrong')
  })
  nextButton.style.display = 'block'
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion()
  } else {
    showScore()
  }
})

function showScore() {
  resetState()
  questionElement.innerText = `Parabens essa é sua pontuação ${score} de ${questions.length}!`
  scoreText.innerText = ''
  nextButton.innerText = 'Reiniciar'
  nextButton.style.display = 'block'
  nextButton.onclick = startQuiz
}

startQuiz()
