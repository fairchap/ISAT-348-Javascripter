let countdown;

const timerDisplay = document.querySelector('.display__time-left');

const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // makes sure that any other existing times are removed
  clearInterval(countdown);

  const now = Date.now(); 

  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); 
    
    if(secondsLeft < 0) {
      clearInterval(countdown); // this function clears anyother time if there is one chowing 
      return;
    }

    //actually displays the time 
    displayTimeLeft(secondsLeft);
  }, 1000);
}
//function that creates the amount of time left from when you clicked the button 
function displayTimeLeft(seconds) {

  const minutes = Math.floor(seconds / 60); //converts seconds to minutes

  const remainderSeconds = seconds % 60; //gives seconds 

  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; 
  document.title = display;
  timerDisplay.textContent = display;
}
//function displays what time the timer will end at
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour; 
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
//function starts the timer
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// pulls from html
buttons.forEach(button => button.addEventListener('click', startTimer)); //listens for click on html button and calls startTimer funtion 
document.customForm.addEventListener('submit', function(e) { //eventlistener for the input section that calls function below 
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});