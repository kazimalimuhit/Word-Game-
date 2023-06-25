const wordList = [
  {
    word: "example",
    definition:
      "a thing characteristic of its kind or illustrating a general rule",
  },
  {
    word: "develop",
    definition:
      "to grow or cause to grow and become more mature, advanced, or elaborate",
  },
  { word: "innovative", definition: "introducing new ideas or methods" },
  { word: "perceive", definition: "to become aware of through the senses" },
  { word: "endeavor", definition: "a strenuous attempt to do something" },
  { word: "ascertain", definition: "to find out for certain" },
  { word: "encumber", definition: "to burden with weight or responsibility" },
  { word: "proliferate", definition: "to grow or increase rapidly" },
  {
    word: "revelation",
    definition:
      "a surprising and previously unknown fact that has been disclosed to others",
  },
  {
    word: "compassion",
    definition:
      "a feeling of deep sympathy and sorrow for another who is stricken by misfortune",
  },
  { word: "vibrant", definition: "full of energy and life" },
  { word: "elusive", definition: "difficult to grasp or define" },
  {
    word: "resilient",
    definition: "able to recover readily from adversity or change",
  },
  {
    word: "disparate",
    definition: "fundamentally different or distinct in nature",
  },
  { word: "ubiquitous", definition: "present everywhere at the same time" },
  { word: "adamant", definition: "unyielding in one's attitude or opinions" },
  { word: "extravagant", definition: "spending a lot of money without limit" },
  {
    word: "heritage",
    definition: "something that has been passed down from previous generations",
  },
  {
    word: "perplexed",
    definition: "feeling confused or unsure about what to do",
  },
  {
    word: "philanthropy",
    definition: "the desire to promote the welfare of others",
  },
  {
    word: "impulsive",
    definition: "acting or done without careful consideration",
  },
  { word: "flourish", definition: "to grow or develop well" },
  {
    word: "empathy",
    definition:
      "the ability to understand and share the feelings of another person",
  },
  {
    word: "deviate",
    definition: "to depart from an established course or norm",
  },
  {
    word: "ascetic",
    definition: "a person who practices self-denial as a spiritual discipline",
  },
  {
    word: "diligent",
    definition: "showing care and conscientiousness in one's work or duties",
  },
  {
    word: "capricious",
    definition:
      "subject to sudden and unpredictable changes of mood or behavior",
  },
  {
    word: "conformity",
    definition: "a tendency to conform to the norms and values of a group",
  },
  {
    word: "candor",
    definition: "the quality of being open and honest in expression",
  },
  {
    word: "ebullient",
    definition: "full of energy, enthusiasm, and excitement",
  },
  { word: "enhance", definition: "to improve or make something better" },
  {
    word: "efficacy",
    definition: "the ability to produce the desired result or effect",
  },
];
let score = 0;
let live = 3;
let timeLeft = 31;
let timerInterval = null;
let question = document.getElementById("question");
let option1 = document.getElementById("option01");
let option2 = document.getElementById("option02");
let option3 = document.getElementById("option03");
let option4 = document.getElementById("option04");
let lives = document.getElementById("lives");
let message = document.getElementById("message-container");
let options = document.querySelectorAll(".option");
let scorebox = document.getElementById("score");
let timer = document.getElementById("timer");
let head = document.querySelector(".head");
const startButton = document.getElementById("start-button");
const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const livescoreconations = document.querySelector(".lives-score-container");

startButton.addEventListener("click", function () {
  startContainer.style.display = "none";
  gameContainer.style.display = "block";
  livescoreconations.style.display = "block";

  // Call your game initialization function here
});

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft == 0) {
      clearInterval(timerInterval);
      reset();
    }
  }, 1000);
}
startTimer();
function updateTimerDisplay() {
  timer.innerHTML = timeLeft + "s";
}

function chooseWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
function reset() {
  chooseWord();
  words = chooseWord();
  setupGame();
  score = 0;
  scorebox.innerHTML = score;
  startContainer.style.display = "block";
  gameContainer.style.display = "none";
  livescoreconations.style.display = "none";

  head.innerHTML = "No more lives";
  startButton.innerHTML = "Start Again";
  startButton.addEventListener("click", function () {
    chooseWord();
    words = chooseWord();
    setupGame();
    score = 0;
    live = 3;
    timeLeft = 30;
    timer.innerHTML = timer + "s";
    lives.innerHTML = live;
    scorebox.innerHTML = score;
    message.innerHTML = "";
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
    livescoreconations.style.display = "block";
  });
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let words = chooseWord();

function setupGame() {
  const possibleAnswers = [words.word];
  for (let i = 0; i < 3; i++) {
    let randomDefinition = chooseWord().word;
    while (possibleAnswers.includes(randomDefinition)) {
      randomDefinition = chooseWord().word;
    }
    possibleAnswers.push(randomDefinition);
  }
  shuffleArray(possibleAnswers);

  question.innerHTML = `Guess the word for the definition: ${words.definition}`;
  option1.innerHTML = possibleAnswers[0];
  option2.innerHTML = possibleAnswers[1];
  option3.innerHTML = possibleAnswers[2];
  option4.innerHTML = possibleAnswers[3];
}
setupGame();
console.log(words.word);
function guessWord(word, userGuess) {
  if (word.word == userGuess) {
    console.log("Correct! The word was " + word + ".");
    score += 1;
    scorebox.innerHTML = score;
    if (score == 1) {
      message.innerHTML = "Nice";
    } else if (score == 2) {
      message.innerHTML = "Damn";
    } else if (score == 3) {
      message.innerHTML = "Keep Going";
    } else if (score == 4) {
      message.innerHTML = "Too Good";
    } else if (score >= 5) {
      message.innerHTML = "You are Unbeatable";
    }
    console.log(word.word);
    restart();
  } else {
    message.innerHTML = "Incorrect";
    live--;
    lives.innerHTML = live;
  }
  if (live == 0) {
    reset();
  } else {
    return;
  }
}
function restart() {
  chooseWord();
  words = chooseWord();
  setupGame();
  timeLeft = 30;
}
let answer = "";
option1.addEventListener("click", (e) => {
  answer = e.target.innerHTML;
  guessWord(words, answer);
});
option2.addEventListener("click", (e) => {
  answer = e.target.innerHTML;
  guessWord(words, answer);
});
option3.addEventListener("click", (e) => {
  answer = e.target.innerHTML;
  guessWord(words, answer);
});
option4.addEventListener("click", (e) => {
  answer = e.target.innerHTML;
  guessWord(words, answer);
});
