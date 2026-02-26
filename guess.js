
// Possible words

const words = ["apple", "banana", "grape", "mango", "orange", "peach", "kiwi"];

let secretWord = "";
let attemptsLeft = 5;
const maxAttempts = 5;


// START GAME FUNCTION

function startGame() {

    attemptsLeft = maxAttempts;

    // Random word selection (array usage)
    let randomIndex = Math.floor(Math.random() * words.length);
    secretWord = words[randomIndex];

    console.log("Secret word (for testing):", secretWord);

    // Reset UI
    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("submitBtn").disabled = false;

    document.body.style.backgroundColor = "white";

    // Display hint
    document.getElementById("hint").textContent =
        "Hint: The word starts with '" + secretWord[0].toUpperCase() + "'";
}


// CHECK GUESS FUNCTION

function checkGuess() {

    // Prevent guessing if game ended
    if (attemptsLeft <= 0) return;

    let input = document.getElementById("guessInput").value;

    // STRING METHODS
    let guess = input.trim().toLowerCase();

    // IF-ELSE conditions
    if (guess === "") {
        attemptsLeft--;
        updateMessage("Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!");
        return;
    }

    if (guess === secretWord) {
        updateMessage("Congratulations! You guessed the secret word!");
        document.body.style.backgroundColor = "lightgreen";
        endGame();
    } else {
        attemptsLeft--;

        if (attemptsLeft > 0) {
            updateMessage("Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!");
        } else {
            updateMessage("Game over! The secret word was '" + secretWord + "'.");
            document.body.style.backgroundColor = "lightcoral";
            endGame();
        }
    }
}


// UPDATE MESSAGE

function updateMessage(text) {
    document.getElementById("message").textContent = text;
}


// END GAME

function endGame() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("submitBtn").disabled = true;
}


// EVENT LISTENERS

document.getElementById("submitBtn").addEventListener("click", checkGuess);

document.getElementById("guessInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.getElementById("restartBtn").addEventListener("click", startGame);


// START FIRST GAME

startGame();
