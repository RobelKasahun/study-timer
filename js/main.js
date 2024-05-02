let time = document.querySelector('#time');
let setTimer = document.querySelector('#set');
let studySession = document.querySelector('#study-session');
let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let m = document.querySelector('#m');
let s = document.querySelector('#s');
let alarmSoundEffect = new Audio('./assets/audio/smart-alarm-audio-effect.mp3');
let second = 60;
let hasTimerStarted = false;
let valueInMinutes;
let resultCode;

start.addEventListener('click', (event) => {
    if (!hasTimerStarted) {
        valueInMinutes = parseInt(studySession.value);

        if (valueInMinutes < 1) {
            valueInMinutes = parseInt(studySession.value);
        } else {
            valueInMinutes = parseInt(studySession.value) - 1;
        }

        /**
         * let the user know that minute is required
         * Otherwise start the timer with the given minutes
         */
        if (isNaN(valueInMinutes) || (valueInMinutes < 0)) {
            alert('Minute is required field and must be value grater than 0.');
        } else {
            resultCode = setInterval(function () {

                // decrement only if second is greater than or equal 1
                if (second >= 1) {
                    --second;
                }

                if (second <= 0) {
                    if (valueInMinutes > 0) {
                        --valueInMinutes;
                        second = 59;
                    } else {
                        // let the alarm goes off when the time is up
                        alarmSoundEffect.play();
                        alarmSoundEffect.loop = true;
                        // time is up
                        stopTimer();
                        setTimer.disabled = false;
                    }
                }

                // add leading zeros if minutes and seconds are zero
                addLeadingZero(valueInMinutes, second);

            }, 1000);
        }
        event.preventDefault();
        setTimer.disabled = true;
    }
    hasTimerStarted = true;
});

function stopTimer() {
    clearInterval(resultCode);
}

stop.addEventListener('click', stopTimer);

function addLeadingZero(minute, second) {
    switch (true) {
        case ((minute < 10) && (second < 10)):
            time.innerHTML = `${0}${minute}${m.textContent} ${0}${second}${s.textContent}`;
            break;

        case (minute < 10):
            time.innerHTML = `${0}${minute}${m.textContent} ${second}${s.textContent}`;
            break;

        case (second < 10):
            time.innerHTML = `${minute}${m.textContent} ${0}${second}${s.textContent}`;
            break;

        default:
            time.innerHTML = `${minute}${m.textContent} ${second}${s.textContent}`;
            break;
    }
}

