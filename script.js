// variables for button input

const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const pauseButton = document.getElementById('pause-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
let currentCharacter;

// adding event to fire when clicked
playButton.addEventListener('click', () => {
    playText(textInput.value);
});

// stop and pause buttons that call their respective functions
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)

// having it stop then update speed and start from the word it left off on
speedInput.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter))
});

//calling the function to speak with the parameter text
const utterance = new SpeechSynthesisUtterance(text);

// listening for when the text ends
utterance.addEventListener('end', () => {
    textInput.disabled = false;
});

// tracking what word the comptuer is speaking
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
});

// play voice function with the text parameter

function playText(text) {
    // checking if its paused
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }

    // checking if its already speaking, this is to avoid it speaking over itself if you spam the play button
    if (speechSynthesis.speaking) return;

    // speech settings
    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    textInput.disabled = true;
    speechSynthesis.speak(utterance);
}

// pause function
function pauseText() {

    // checking if its already speaking, if so pause
    if (speechSynthesis.speaking) speechSynthesis.pause();
}

// stop function
function stopText() {
    // resuming if paused, then canceling the voice.
    speechSynthesis.resume()
    speechSynthesis.cancel();
}