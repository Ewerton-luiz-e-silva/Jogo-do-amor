// ----------------------
// Elementos da DOM
// ----------------------
const loginScreen = document.getElementById('login-screen');
const quizScreen1 = document.getElementById('quiz-screen-1');
const congratsScreen1 = document.getElementById('congrats-screen-1');
const quizScreen2 = document.getElementById('quiz-screen-2');
const poemScreen = document.getElementById('poem-screen');
const quizScreen3 = document.getElementById('quiz-screen-3');
const finalCodeScreen = document.getElementById('final-code-screen');
const memoriesScreen = document.getElementById('memories-screen');

const weddingDateInput = document.getElementById('wedding-date');
const loginBtn = document.getElementById('login-btn');
const loginMessage = document.getElementById('login-message');

const nextQuestionBtn1 = document.getElementById('next-question-1');
const finishQuiz1Btn = document.getElementById('finish-quiz-1');
const nextQuestionBtn2 = document.getElementById('next-question-2');
const finishQuiz2Btn = document.getElementById('finish-quiz-2');
const nextQuestionBtn3 = document.getElementById('next-question-3');
const finishQuiz3Btn = document.getElementById('finish-quiz-3');

const code1Input = document.getElementById('code-1');
const unlockPhase2Btn = document.getElementById('unlock-phase2');
const codeMessage1 = document.getElementById('code-message-1');

const code2Input = document.getElementById('code-2');
const unlockPhase3Btn = document.getElementById('unlock-phase3');
const codeMessage2 = document.getElementById('code-message-2');

const code3Input = document.getElementById('code-3');
const unlockMemoriesBtn = document.getElementById('unlock-memories');
const codeMessage3 = document.getElementById('code-message-3');

const playMusicBtn = document.getElementById('play-music');
const musicContainer = document.getElementById('music-container');
const video = document.getElementById('music-video');
const musicProgress = document.getElementById('music-progress');

const celebrationContainer = document.getElementById('celebration');
const floatingHeartsContainer = document.querySelector('.floating-hearts');

// Elementos de áudio
const clickSound = document.getElementById('click-sound');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const celebrationSound = document.getElementById('celebration-sound');

// ----------------------
// Variáveis de estado
// ----------------------
let currentQuestionPhase1 = 1;
let currentQuestionPhase2 = 6;
let currentQuestionPhase3 = 11;
let correctAnswersPhase1 = 0;
let correctAnswersPhase2 = 0;
let correctAnswersPhase3 = 0;

// ----------------------
// Event Listeners
// ----------------------
loginBtn.addEventListener('click', checkWeddingDate);
nextQuestionBtn1.addEventListener('click', () => showNextQuestion(1));
finishQuiz1Btn.addEventListener('click', finishQuiz1);
nextQuestionBtn2.addEventListener('click', () => showNextQuestion(2));
finishQuiz2Btn.addEventListener('click', finishQuiz2);
nextQuestionBtn3.addEventListener('click', () => showNextQuestion(3));
finishQuiz3Btn.addEventListener('click', finishQuiz3);
unlockPhase2Btn.addEventListener('click', () => checkCode(1));
unlockPhase3Btn.addEventListener('click', () => checkCode(2));
unlockMemoriesBtn.addEventListener('click', () => checkCode(3));
playMusicBtn.addEventListener('click', playMusic);

// Som em todos os botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio play failed:", e));
    });
});

// Opções de quiz
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        const isCorrect = this.getAttribute('data-correct') === 'true';
        const questionId = this.closest('.question').id;
        const questionNum = parseInt(questionId.split('-')[1]);
        const feedbackElement = document.getElementById(`feedback-${questionNum}`);

        if (isCorrect) {
            feedbackElement.textContent = 'Resposta correta! ❤';
            feedbackElement.classList.remove('hidden', 'error');
            feedbackElement.classList.add('success');
            correctSound.play().catch(e => console.log("Audio play failed:", e));

            if (questionNum <= 5) correctAnswersPhase1++;
            else if (questionNum <= 10) correctAnswersPhase2++;
            else correctAnswersPhase3++;
        } else {
            feedbackElement.textContent = 'Resposta incorreta. Tente novamente!';
            feedbackElement.classList.remove('hidden', 'success');
            feedbackElement.classList.add('error');
            wrongSound.play().catch(e => console.log("Audio play failed:", e));
        }

        feedbackElement.classList.remove('hidden');

        // Mostrar próximo botão se estiver correto
        if (questionNum <= 5) {
            nextQuestionBtn1.classList.toggle('hidden', !isCorrect);
            if (questionNum === 5 && isCorrect) {
                finishQuiz1Btn.classList.remove('hidden');
                nextQuestionBtn1.classList.add('hidden');
            }
        } else if (questionNum <= 10) {
            nextQuestionBtn2.classList.toggle('hidden', !isCorrect);
            if (questionNum === 10 && isCorrect) {
                finishQuiz2Btn.classList.remove('hidden');
                nextQuestionBtn2.classList.add('hidden');
            }
        } else {
            nextQuestionBtn3.classList.toggle('hidden', !isCorrect);
            if (questionNum === 15 && isCorrect) {
                finishQuiz3Btn.classList.remove('hidden');
                nextQuestionBtn3.classList.add('hidden');
            }
        }
    });
});

// ----------------------
// Funções
// ----------------------
function checkWeddingDate() {
    const inputDate = weddingDateInput.value.trim();
    if (inputDate === '15/10/2016') {
        showScreen(quizScreen1);
        createConfetti();
        celebrationSound.play().catch(e => console.log("Audio play failed:", e));
    } else {
        loginMessage.textContent = 'Data incorreta. Tente novamente.';
        loginMessage.classList.remove('hidden', 'success');
        loginMessage.classList.add('error');
    }
}

function showNextQuestion(phase) {
    if (phase === 1) {
        document.getElementById(`question-${currentQuestionPhase1}`).classList.add('hidden');
        currentQuestionPhase1++;
        document.getElementById(`question-${currentQuestionPhase1}`).classList.remove('hidden');
        nextQuestionBtn1.classList.add('hidden');
    } else if (phase === 2) {
        document.getElementById(`question-${currentQuestionPhase2}`).classList.add('hidden');
        currentQuestionPhase2++;
        document.getElementById(`question-${currentQuestionPhase2}`).classList.remove('hidden');
        nextQuestionBtn2.classList.add('hidden');
    } else if (phase === 3) {
        document.getElementById(`question-${currentQuestionPhase3}`).classList.add('hidden');
        currentQuestionPhase3++;
        document.getElementById(`question-${currentQuestionPhase3}`).classList.remove('hidden');
        nextQuestionBtn3.classList.add('hidden');
    }
}

function finishQuiz1() {
    if (correctAnswersPhase1 === 5) {
        showScreen(congratsScreen1);
        createConfetti();
        celebrationSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

function finishQuiz2() {
    if (correctAnswersPhase2 === 5) {
        showScreen(poemScreen);
        createConfetti();
        celebrationSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

function finishQuiz3() {
    if (correctAnswersPhase3 === 5) {
        showScreen(finalCodeScreen);
        createConfetti();
        celebrationSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

function checkCode(phase) {
    let codeInput, messageElement, correctCode, nextScreen;

    if (phase === 1) {
        codeInput = code1Input;
        messageElement = codeMessage1;
        correctCode = 'liam-o-brincalhao';
        nextScreen = quizScreen2;
    } else if (phase === 2) {
        codeInput = code2Input;
        messageElement = codeMessage2;
        correctCode = 'logan-o-wolverine';
        nextScreen = quizScreen3;
    } else if (phase === 3) {
        codeInput = code3Input;
        messageElement = codeMessage3;
        correctCode = 'erik-o-menino-sorrident';
        nextScreen = memoriesScreen;
    }

    if (codeInput.value.trim() === correctCode) {
        showScreen(nextScreen);
        createConfetti();
        celebrationSound.play().catch(e => console.log("Audio play failed:", e));

        if (phase === 1) {
            document.getElementById('question-6').classList.remove('hidden');
            document.querySelectorAll('#quiz-screen-2 .question').forEach((q, idx) => { if (idx > 0) q.classList.add('hidden'); });
        } else if (phase === 2) {
            document.getElementById('question-11').classList.remove('hidden');
            document.querySelectorAll('#quiz-screen-3 .question').forEach((q, idx) => { if (idx > 0) q.classList.add('hidden'); });
        }
    } else {
        messageElement.textContent = 'Código incorreto. Tente novamente.';
        messageElement.classList.remove('hidden', 'success');
        messageElement.classList.add('error');
    }
}

// ----------------------
// Função de vídeo
// ----------------------
function playMusic() {
    musicContainer.style.display = 'block';
    video.play().catch(e => console.log("Erro ao tocar vídeo:", e));
    playMusicBtn.style.display = 'none';

    video.addEventListener('timeupdate', function() {
        const percentage = (video.currentTime / video.duration) * 100;
        musicProgress.style.width = percentage + '%';
    });
}

// ----------------------
// Outras funções
// ----------------------
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function createConfetti() {
    celebrationContainer.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        celebrationContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
    addFloatingHearts();
}

function addFloatingHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        floatingHeartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
}

function getRandomColor() {
    const colors = ['#e75480', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ----------------------
// Inicialização
// ----------------------
document.getElementById('question-1').classList.remove('hidden');
document.getElementById('question-6').classList.add('hidden');
document.getElementById('question-11').classList.add('hidden');
nextQuestionBtn1.classList.add('hidden');
nextQuestionBtn2.classList.add('hidden');
nextQuestionBtn3.classList.add('hidden');

addFloatingHearts();
