//зполучаем ссылки на необходимые элементы
const startChangeColorBtn = document.querySelector('[data-start]');
const stopChangeColorBtn = document.querySelector('[data-stop]');
const bodyChangeColor = window.document.body;

let timerId = null; //обьявляем переменную и присваиваем ей начальное значение null
//функция, которая рандомно берет цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//вешаем события
startChangeColorBtn.addEventListener('click', onClickChangeColor);
stopChangeColorBtn.addEventListener('click', onClickStopChangeColor);
//описываем функции
function onClickChangeColor() {
  timerId = setInterval(() => {
    bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startChangeColorBtn.disabled = true; //делаем start активной
  stopChangeColorBtn.disabled = false; //делаем stop неактивной
}

function onClickStopChangeColor() {
  clearInterval(timerId); //убираем вызов функции через интервал
  startChangeColorBtn.disabled = false; //делаем start неактивной
  stopChangeColorBtn.disabled = true; //делаем stop активной
}
