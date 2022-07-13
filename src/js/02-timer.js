// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true); //вешаем атрибут disabled на кнопку start

//Создаем обьект конфигурации елементов DOM
const DOM_ELEMENTS_CONFIG = {
  days: daysTime,
  hours: hoursTime,
  minutes: minutesTime,
  seconds: secondsTime,
};
//Создаем обьект с нашим таймером
const timer = {
  startDate: null,
  timeDelta: null,
  intevalId: null,
  isActive: false,
  start() {
    //создаем условие, чтобы не запускался повторно таймер при нажатии на старт
    if (this.isActive || !this.startDate) {
      //если кнопка активна и невыбрана дата
      return;
    }
    this.isActive = true;
    const currentTime = Date.now(); //в переменную записываем текущее время
    this.timeDelta = this.startDate - currentTime; // в this.timeDelta записываем разницу между выбранной датой и текущей

    this.intevalId = setInterval(() => {
      //создаем интервал
      if (this.timeDelta <= 0) {
        // условие на то, что если timeDelta меньше или равна 0,
        //выводим сообщение и очищаем интервал, присваевем значение null для timeDelta и startDate
        clearInterval(this.intevalId);
        Notiflix.Notify.info('Timer has finished!');
        this.timeDelta = null;
        this.startDate = null;
        return;
      }
      const time = convertMs(this.timeDelta); //конвертируем нашу timeDelta
      updateClockTime(time); // обновляем
      this.timeDelta = this.timeDelta - 1000; //каждую секунду от timeDelta отнимаем 1 сек
    }, 1000);
  },
};
//обьект настроек для flatpickr
const options = {
  enableTime: true, //Включает выбор времени
  time_24hr: true, //Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
  defaultDate: new Date(), //Устанавливает начальную выбранную дату (указываем объект )
  minuteIncrement: 1, //Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) {
    //условие на то, что нужно выбрать дату в будущем
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      timer.startDate = selectedDates[0]; // startDate присваем значение выбранной даты
      btnStart.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  timer.start();
});

function setTextContent(domelem, value) {
  domelem.textContent = addLeadingZero(value);
}
//функция в которой перебираем { days, hours, minutes, seconds } и функцией setTextContent присваем значение
function updateClockTime(dateConvert) {
  for (const dateConvertKey in dateConvert) {
    setTextContent(
      DOM_ELEMENTS_CONFIG[dateConvertKey],
      dateConvert[dateConvertKey]
    );
  }
}
//принимает число и приводит к строке и добавлянт 0 если число меньше 2-х знаков
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//функция конвертации времени из милисекунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
