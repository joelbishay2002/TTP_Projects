let randomNum = Math.floor(Math.random() * 100) + 1;
let score = 10;
let highscore = 0;

const changeMsg = (message) => {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function() {
    const inputUser = Number(document.querySelector('.guess').value);

    if (!inputUser) {
        changeMsg('Please enter a valid number');
    } else if (inputUser === randomNum) {
        changeMsg('Correct number!');
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.guess').disabled = true;
        document.querySelector('.check').disabled = true;

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    } else if (inputUser !== randomNum) {
        if (score === 1) {
            changeMsg('You lost the game');
            document.querySelector('body').style.backgroundColor = 'red';
            document.querySelector('.guess').disabled = true;
            document.querySelector('.check').disabled = true;
        } else {
            changeMsg(inputUser > randomNum ? 'Too high' : 'Too low');
            score--;
            document.querySelector('.score').textContent = score;
        }
    }
});

document.querySelector('.again').addEventListener('click', function() {
    score = 10;
    randomNum = Math.floor(Math.random() * 100) + 1;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.guess').disabled = false;
    document.querySelector('.check').disabled = false;
});
