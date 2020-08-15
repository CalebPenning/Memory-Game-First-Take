const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let guesses = [];
let count = 0;
let score = 0;
let len = 0;

function handleCardClick(e) {
  // Check that the click count is 0 or 1, and that the target does not yet have a given background color;
  if (count <= 1 && e.target.style.backgroundColor === "") {
    // Render the div's color based on the class it's given
    e.target.style.backgroundColor = e.target.className;
    // Push the colors to an array to check matches
    guesses.push(e.target.className);
    // Increment click count
    count++;
    console.log(guesses)
    if (guesses.length === 2) {
      if (guesses[0] !== guesses[1]) {
        // Penalize wrong guesses, sets timeout for color reset
        score--;
        setTimeout(function() {
        const first = document.querySelectorAll(`.${guesses[0]}`);
        const second = document.querySelectorAll(`.${guesses[1]}`);
          // Checks if guesses are matches based on classnames, resets color if not
        for (let one of first) {
          if (!one.classList.contains("match")) {
            one.style.backgroundColor = "";
          }
        }
        for (let two of second) {
          if (!two.classList.contains("match")) {
            two.style.backgroundColor = "";
          }
        }
        // Empties matching array and resets the click count
        guesses = [];
        count = 0;
      }, 1000)
      } else {
        // assigns matching cards the class "match"
        const matches = document.querySelectorAll(`.${guesses[0]}`);
        for (let match of matches) {
          match.classList.add("match");
        }
        // Empties matching array, resets click count, gives extra point for correct match
        guesses = [];
        count = 0;
        score += 2;
        // Number to check if all cards have been matched
        len += 2;
        // Updates score
        let total = document.getElementById('scoretotal');
        total.innerHTML = score;
      }
    }
  }
  if (COLORS.length === len) {
    let congrats = document.querySelector('#congrats');
    congrats.innerHTML = "You won!"
  }
}

createDivsForColors(shuffledColors);