
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { split } from "postcss/lib/list";


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const btn = document.querySelector('button');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
      if(selectedDates[0] > date){
        btn.removeAttribute('disabled', '');
 
        btn.addEventListener('click', ()=>{
          btn.setAttribute('disabled', '');



        const intervalId = setInterval(() =>{
          const now = new Date();
          const mili = selectedDates[0] - now;

          if(mili <= 0){
            clearInterval(intervalId);
            updateClock(0, 0, 0, 0);
            btn.removeEventListener()
            return;
          }
          
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;
        
          // Remaining days
          const days = Math.floor(mili / day);
          // Remaining hours
          const hours = Math.floor((mili % day) / hour);
          // Remaining minutes
          const minutes = Math.floor(((mili % day) % hour) / minute);
          // Remaining seconds
          const seconds = Math.floor((((mili % day) % hour) % minute) / second);

          updateClock(days, hours, minutes, seconds);

           

        }, 1000);


        })


      }else{
        btn.setAttribute('disabled', '');
        iziToast.show({              
          message: 'Please choose a date in the future'
      })
      }
    },
  };
  

  function updateClock(days, hours, minutes, seconds){
    dataDays.textContent = String(days).padStart(2, '0');
    dataHours.textContent = String(hours).padStart(2, '0');
    dataMinutes.textContent = String(minutes).padStart(2, '0');
    dataSeconds.textContent = String(seconds).padStart(2, '0');
  }




flatpickr('#datetime-picker', options);



