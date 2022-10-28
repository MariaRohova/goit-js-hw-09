function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;
refs.stop.setAttribute('disabled', true);


refs.start.addEventListener('click', () => {
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled');
  // timerId = setTimeout(() => {
     refs.body.style.backgroundColor = getRandomHexColor();
    console.log(`Color`);
  // },);
  
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    console.log(`Start`);
  }, 1000);
});

refs.stop.addEventListener('click', () => {
    refs.start.removeAttribute ('disabled');
    refs.stop.setAttribute('disabled', true);

  clearInterval(timerId);
  console.log(`Stop`);
});
