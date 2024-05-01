let time = document.querySelector('#time');
let setTimer = document.querySelector('#set')
let studySession = document.querySelector('#study-session');
let breakSession = document.querySelector('#break-session');
let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let studyError = document.querySelector('#study-error');
// let breakError = document.querySelector('#break-error');
let alarmSoundEffect = new Audio('../assets/audio/smart-alarm-audio-effect.mp3');
let second = 60;
let hasTimerStarted = false;
let valueInMinutes;
let resultCode;

start.addEventListener('click', (event) => {
    if (!hasTimerStarted) {
        valueInMinutes = parseInt(studySession.value) - 1;

        /**
         * let the user know that minute is required
         * Otherwise start the timer with the given minutes
         */
        if (isNaN(valueInMinutes) || (valueInMinutes <= 0 && second <= 0)) {
            console.log('Minute and seconds are required field and must be value grater than 0.');
        } else {
            resultCode = setInterval(() => {

                --second;

                if (second < 0) {
                    if (valueInMinutes > 0) {
                        --valueInMinutes;
                    } else {
                        // let the alarm goes off when the time is up
                        alarmSoundEffect.play();
                        alarmSoundEffect.loop = true;
                        // time is up
                        stopTimer();
                    }
                    second = 59;
                }

                // add leading zeros if minutes and seconds are zero
                addLeadingZero(valueInMinutes, second);

            }, 1000);
        }
        event.preventDefault();
    }
    hasTimerStarted = true;
});

function stopTimer() {
    clearInterval(resultCode);
}

stop.addEventListener('click', stopTimer);

function addLeadingZero(minute, second) {
    if (minute < 10 && (second < 10)) {
        time.innerHTML = `${0}${minute}:${0}${second}`;
    } else if (minute < 10) {
        time.innerHTML = `${0}${minute}:${second}`;
    } else if (second < 10) {
        time.innerHTML = `${minute}:${0}${second}`;
    } else {
        time.innerHTML = `${minute}:${second}`;
    }
}

