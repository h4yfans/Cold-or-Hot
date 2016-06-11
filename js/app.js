
var secretNumber = generateRandomNumber(1, 100);

var oldGuess = 0;

var counter = 0;
$('#count').text(counter);


function newGame() {
    document.location.reload(true);
}

function generateRandomNumber(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function showGuessCounter(counter) {
    $('#count').text(counter);
}

function guessHistory(guessedNumber) {
    $('#guessList').append('<li>'  + guessedNumber + '*' + '</li>');
}

function isInt(guessedNumber) {

    if (isNaN(guessedNumber)) {
        alert('You must enter a number!');
        $('#userGuess').val('');
        return false;
    }else if (guessedNumber % 1 !== 0) {
        alert('You must enter an integer value!');
        $('#userGuess').val('');
        return false; 
    }else if ((guessedNumber < 1) || (guessedNumber > 100)) {
        alert('Please guess a number between 1 to 100!');
        $('#userGuess').val('');
        return false;
    }
    else {
        guessFeedback(secretNumber, guessedNumber);
        counter++;
        guessHistory(guessedNumber);
        showGuessCounter(counter);
        $('#userGuess').val('');
    }
}

function guessFeedback(secretNumber, guessedNumber) {
    var difference = Math.abs(secretNumber - guessedNumber);
    if (difference >= 50) {
        $('#condition').text('Very Cold!');
        document.body.style.backgroundColor = '#211375';
    } else if (difference >= 30 && difference <= 49) {
        $('#condition').text('Cold!');
        document.body.style.backgroundColor = '#80BCDB';
    } else if (difference >= 20 && difference <= 29) {
        $('#condition').text('Warm!');
        document.body.style.backgroundColor = '#FF7F00';
    } else if (difference >= 10 && difference <= 19) {
        $('#condition').text('Hot!');
        document.body.style.backgroundColor = '#F76242';
    } else if (difference >= 1 && difference <= 9) {
        $('#condition').text('Very Hot!!');
        document.body.style.backgroundColor = '#F02D35';
    } else {
        $('#condition').text('You you found it. Well done!');
        document.body.style.backgroundColor = '#ff0404';
        document.getElementById("userGuess").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }
}

function relativeFeedback(secretNumber, oldGuess, newGuess) {
    var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
    var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
    if (newDiff > oldDiff) {
        $('#relative-feedback').text('You are colder than the last guess!');
    } else if (newDiff === oldDiff) {
        $('#relative-feedback').text('You are as far as your previous guess!');
    } else {
        $('#relative-feedback').text('You are hotter than the last guess!');
    }
}


$(document).ready(function () {
    $('#guessButton').on('click', function () {

        var guessedNumber = $('#userGuess').val();

        var newGuess = guessedNumber;

        isInt(guessedNumber);

        if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }

        oldGuess = newGuess;
    });

    $(document).on('keypress', function (event) {
        if (event.which === 13) {

            event.preventDefault();

            var guessedNumber = $('#userGuess').val();

            var newGuess = guessedNumber;

            isInt(guessedNumber);

            if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }

            oldGuess = newGuess;
        }
    });
});
