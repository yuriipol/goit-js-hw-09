import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = form.querySelector('.delay');
const inputAmount = form.querySelector('.amount');
const inputStep = form.querySelector('.step');

let delay = inputDelay.value;

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let count = 0;

  const intervalId = setInterval(function () {
    count += 1;
    if (count === inputAmount.value) {
      clearInterval(intervalId);
    }

    let position = count;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }, (delay += inputStep.value));

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve('Это resolve');
      } else {
        reject('Это reject');
      }
    }, delay);
  });
}
