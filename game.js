const startTabBg = document.querySelector('.start-tab__bg');
const startMin = document.querySelector('#start-tab__min');
const startMax = document.querySelector('#start-tab__max');
const startPopup = document.querySelector('.pop-up__incorrect__container');
const buttonStart = document.querySelector('.start-tab__button');
buttonStart.addEventListener('click', startValidation);

const finalTabBg = document.querySelector('.final-tab__bg');
const finalCounter = document.querySelector('.final-tab__attempt-count');
const finalNumber = document.querySelector('.final-tab__num');
const buttonNewStart = document.querySelector('.final-tab__button');
buttonNewStart.addEventListener('click', startGame);

const gameInputForm = document.querySelector('#game__input-form');
const gameCounter = document.querySelector('.counter__text');
const infoLess = document.querySelector('.input-form__text__less');
const infoMore = document.querySelector('.input-form__text__more');


const popupLess = document.querySelector('.pop-up__text__range__less');
const popupMore = document.querySelector('.pop-up__text__range__more');
const gamePopup = document.querySelector('.pop-up__game__incorrect__container');
const gameRangePopup = document.querySelector('.pop-up__range__incorrect__container');

const helpPopup = document.querySelector('.pop-up__help__container')
const gameParity = document.querySelector('.pop-up__text__parity');

const buttonGame = document.querySelector('.game__button');
buttonGame.addEventListener('click', checkNumber);


let minGame = 1;
let maxGame = 100;
let hiddenNumber = 0;
let counter = 0;

function startValidation() {
    let valueMin = startMin.value;
    let valueMax = startMax.value;
    const checkMin = /^\d+$/.test(valueMin);
    const checkMax = /^\d+$/.test(valueMax);
    valueMin = Number(valueMin);
    valueMax = Number(valueMax);
    if (checkMin && checkMax && valueMin < valueMax) {
        minGame = valueMin;
        maxGame = valueMax;
        hiddenNumber = Math.floor(Math.random() * valueMax) + valueMin;
        if (hiddenNumber % 2 === 0) gameParity.textContent = 'четное';
        else gameParity.textContent = 'нечетное';

        startTabBg.style.display = 'none';
    } else showPopup(startPopup);
}

function startGame() {
    minGame = 1;
    maxGame = 100;
    hiddenNumber = 0;
    counter = 0;
    gameCounter.textContent = counter;
    infoLess.style.display = 'none';
    infoMore.style.display = 'none';
    gameInputForm.value = '';
    finalTabBg.style.display = 'none';
    startTabBg.style.display = 'flex';
}

function checkNumber() {
    let gameNumberValue = gameInputForm.value;
    const checkGameNumber = /^\d+$/.test(gameNumberValue);
    gameNumberValue = Number(gameNumberValue);
    if (checkGameNumber) {
        if (gameNumberValue >= minGame && gameNumberValue <= maxGame) {
            counter += 1;
            gameCounter.textContent = counter;

            if (gameNumberValue === hiddenNumber) endGame();

            else if (counter % 3 === 0) showPopup(helpPopup);

            if (gameNumberValue < hiddenNumber) {
                infoLess.style.display = 'none';
                infoMore.style.display = 'block';
            } else {
                infoMore.style.display = 'none';
                infoLess.style.display = 'block';
            }

        } else {
            popupLess.textContent = minGame;
            popupMore.textContent = maxGame;
            showPopup(gameRangePopup);
        }
    } else showPopup(gamePopup);
}

function endGame() {
    finalCounter.textContent = counter;
    finalNumber.textContent = hiddenNumber;
    finalTabBg.style.display = 'flex';
}

function showPopup(popup) {
    popup.style.display = 'flex';
    let opacity = 1.2;
    popup.style.opacity = opacity;
    const interval = setInterval(() => {
        opacity -= 0.1;
        popup.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(interval);
            popup.style.display = 'none';
        }
    }, 100);
}

startGame();