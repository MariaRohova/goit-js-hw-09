import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  start: document.querySelector('button[data-start]'),
  input: document.querySelector('input#datetime-picker'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  label: document.querySelectorAll('.timer .label'),
};
let selectDateVal;
refs.start.setAttribute('disabled', true);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (currentDate >= selectedDates[0]) {
        Notify.failure('Please choose a date in the future');
        refs.start.setAttribute('disabled', true);
      return;
      }
      refs.start.removeAttribute('disabled');
    selectDateVal = selectedDates[0];
},
};

flatpickr(refs.input, options)

refs.start.addEventListener('click', () => {
    refs.start.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
    changeTime(selectDateVal - Date.now())
    const timerId = setInterval(() => {
        const currentDate = new Date();
        const diff = selectDateVal - currentDate;
        if (diff <= 0) {
            clearInterval(timerId);
            refs.start.disabled = false;
            return
        };
        
        changeTime(diff);
    },1000);
});

function changeTime(diff) {
    const sendTime = convertMs(diff)
    console.log(convertMs(diff));
    refs.seconds.textContent = sendTime.seconds.toString().padStart(2, '0');
    refs.minutes.textContent = sendTime.minutes.toString().padStart(2, '0');
    refs.hours.textContent = sendTime.hours.toString().padStart(2, '0');
    refs.days.textContent = sendTime.days.toString().padStart(2, '0');
};


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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20},