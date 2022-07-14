import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = form.querySelector('.delay');
const inputAmount = form.querySelector('.amount');
const inputStep = form.querySelector('.step');

let delay = Number(inputDelay.value);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let promiseDelay = Number(delay.value);
  // let count = 0;

  // const intervalId = setInterval(function () {
  //   count += 1;
  //   console.log(Number(inputAmount.value));
  //   if (count === Number(inputAmount.value)) {
  //     clearInterval(intervalId);
  //     return;
  //   }

  //   let position = count;

  //   createPromise(position, delay)
  //     .then(({ position, delay }) => {
  //       Notiflix.Notify.success(
  //         `✅ Fulfilled promise ${position} in ${delay}ms`
  //       );
  //     })
  //     .catch(({ position, delay }) => {
  //       Notiflix.Notify.failure(
  //         `❌ Rejected promise ${position} in ${delay}ms`
  //       );
  //     });
  // }, (delay += Number(inputStep.value)));
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, promiseDelay)
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
    promiseDelay += Number(step.value);
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
