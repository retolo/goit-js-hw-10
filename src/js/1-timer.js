
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { split } from "postcss/lib/list";


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
        let userSelectedDate = selectedDates[0];



        btn.addEventListener('click', ()=>{
          btn.setAttribute('disabled', '');


        let secondsForMath = (userSelectedDate - date);

        const seconds = 60;
        const minutes = Math.floor(secondsForMath / (1000 * 60)) % 60;
        const hours = Math.floor(secondsForMath / (1000 * 60 * 60)) % 24;
        const days = Math.floor(secondsForMath / (1000 * 60 * 60 * 24)) % 30;
        
        dataDays.textContent = days;
        dataHours.textContent = hours;
        dataMinutes.textContent = minutes;
        dataSeconds.textContent = seconds;

        const intervalId = setInterval(() =>{


          if(dataDays.textContent === '0' && dataHours.textContent === '0' && dataMinutes.textContent === '0' && dataSeconds.textContent === '1'){
            dataDays.textContent = 0;
            dataHours.textContent = 0;
            dataMinutes.textContent = 0;
            dataSeconds.textContent = 0;
            clearInterval(intervalId);
            btn.removeAttribute('disabled', '')
            return;
            
          }


            
            dataSeconds.textContent -= 1;
            if(dataSeconds.textContent === '0'){
                dataMinutes.textContent -= 1;
                dataSeconds.textContent = 60;


                 if(dataMinutes.textContent === '0'){
                    dataHours.textContent -= 1;
                    dataMinutes.textContent = 60;


                     if(dataHours.textContent === '0'){
                        dataDays.textContent -= 1;
                        dataHours.textContent = 24;


                        




                        
        
                    }
                 }
            }

        }, 1000);

        




        })

         
        

      }else{
        btn.setAttribute('disabled', '');
        return alert('No');
      }
    },
  };
  
;




flatpickr('#datetime-picker', options);
