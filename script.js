
'use strict';

const questions = [
  {
    question: "What is the name of the school Harry Potter attends?",
    options: [
      "Beauxbatons Academy",
      "Hogwarts School of Witchcraft and Wizardry",
      "Durmstrang Institute",
      "Ilvermorny School"
    ],
    answer: 1
  },
  {
    question: "What is Harry Potter's house at Hogwarts?",
    options: ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"],
    answer: 2
  },
  {
    question: "What is the name of Harry Potter's owl?",
    options: ["Crookshanks", "Hedwig", "Errol", "Pigwidgeon"],
    answer: 1
  },
  {
    question: "Who are Harry's two best friends?",
    options: [
      "Fred and George",
      "Neville and Luna",
      "Cedric and Cho",
      "Ron Weasley and Hermione Granger"
    ],
    answer: 3
  },
  {
    question: "What position does Harry play on his Quidditch team?",
    options: ["Keeper", "Beater", "Seeker", "Chaser"],
    answer: 2
  },
  {
    question: "What is the name of the bank used by wizards?",
    options: [
      "Gringotts",
      "Ollivanders",
      "Flourish and Blotts",
      "The Leaky Cauldron"
    ],
    answer: 0
  },
  {
    question: "Who is the headmaster of Hogwarts for most of Harry's early years?",
    options: [
      "Severus Snape",
      "Albus Dumbledore",
      "Minerva McGonagall",
      "Rubeus Hagrid"
    ],
    answer: 1
  },
  {
    question: "What platform does the Hogwarts Express depart from?",
    options: [
      "Platform 7½",
      "Platform 10",
      "Platform 8¾",
      "Platform 9¾"
    ],
    answer: 3
  },
  {
    question: "What is the name of the magical sport played on flying broomsticks?",
    options: [
      "Gobstones",
      "Quidditch",
      "Exploding Snap",
      "Wizard Chess"
    ],
    answer: 1
  },
  {
    question: "What spell is commonly used to disarm an opponent?",
    options: [
      "Lumos",
      "Expecto Patronum",
      "Expelliarmus",
      "Alohomora"
    ],
    answer: 2
  },
  {
    question: "What is the name of Voldemort's pet snake?",
    options: ["Nagini", "Aragog", "Basilisk", "Fang"],
    answer: 0
  },
  {
    question: "Which object reveals a person's deepest desire?",
    options: [
      "The Pensieve",
      "The Mirror of Erised",
      "The Marauder's Map",
      "The Goblet of Fire"
    ],
    answer: 1
  },
  {
    question: "Who gives Harry the Invisibility Cloak during his first Christmas at Hogwarts?",
    options: [
      "Hagrid",
      "Sirius Black",
      "Albus Dumbledore, anonymously",
      "Ron Weasley"
    ],
    answer: 2
  },
  {
    question: "What are the three Deathly Hallows?",
    options: [
      "Elder Wand, Resurrection Stone, Invisibility Cloak",
      "Elder Wand, Philosopher's Stone, Marauder's Map",
      "Time-Turner, Elder Wand, Goblet of Fire",
      "Resurrection Stone, Horcrux, Sorting Hat"
    ],
    answer: 0
  },
  {
    question: "What is the name of Hermione's cat?",
    options: ["Scabbers", "Crookshanks", "Mrs. Norris", "Trevor"],
    answer: 1
  },
  {
    question: "Which magical creature is Buckbeak?",
    options: ["Thestral", "Phoenix", "Hippogriff", "Dragon"],
    answer: 2
  },
  {
    question: "Which house-elf serves the Malfoy family before becoming free?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    answer: 2
  },
  {
    question: "Who was disguised as Mad-Eye Moody during Harry's fourth year?",
    options: [
      "Peter Pettigrew",
      "Barty Crouch Jr.",
      "Lucius Malfoy",
      "Igor Karkaroff"
    ],
    answer: 1
  },
  {
    question: "Which Horcrux does Ron destroy with the Sword of Gryffindor?",
    options: [
      "Ravenclaw's diadem",
      "Hufflepuff's cup",
      "Slytherin's locket",
      "Marvolo Gaunt's ring"
    ],
    answer: 2
  },
  {
    question: "What is the name of the village near Hogwarts with shops such as Honeydukes?",
    options: [
      "Godric's Hollow",
      "Little Whinging",
      "Diagon Alley",
      "Hogsmeade"
    ],
    answer: 3
  }
];

// HTML elements
const progressLabel = document.getElementById('progress-label');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');
const questionNumber = document.getElementById('question-number');
const questionHeading = document.getElementById('quiz-heading');
const optionsContainer = document.getElementById('options');
const selectionNote = document.getElementById('selection-note');

const backButton = document.getElementById('back-btn');
const nextButton = document.getElementById('next-btn');

const quizPanel = document.getElementById('quiz-panel');
const resultsPanel = document.getElementById('results-panel');

const resultTitle = document.getElementById('result-title');
const scoreElement = document.getElementById('score');
const resultMessage = document.getElementById('result-message');
const reviewList = document.getElementById('review-list');
const restartButton = document.getElementById('restart-btn');

// Quiz state
let currentIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);

// Display the current question
function renderQuestion() {
  const current = questions[currentIndex];
  const selected = selectedAnswers[currentIndex];

  progressLabel.textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;

  progressTrack.setAttribute(
    'aria-valuenow',
    String(currentIndex + 1)
  );

  progressFill.style.width =
    `${((currentIndex + 1) / questions.length) * 100}%`;

  questionNumber.textContent =
    `QUESTION ${String(currentIndex + 1).padStart(2, '0')}`;

  questionHeading.textContent = current.question;
  optionsContainer.replaceChildren();

  current.options.forEach((optionText, optionIndex) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'option';
    button.setAttribute(
      'aria-pressed',
      String(selected === optionIndex)
    );

    if (selected === optionIndex) {
      button.classList.add('selected');
    }

    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = String.fromCharCode(65 + optionIndex);

    const text = document.createElement('span');
    text.className = 'option-text';
    text.textContent = optionText;

    button.append(letter, text);

    button.addEventListener('click', () => {
      chooseAnswer(optionIndex);
    });

    optionsContainer.appendChild(button);
  });

  selectionNote.textContent = selected === null
    ? 'Choose one answer to continue.'
    : 'Answer selected. You can change it before continuing.';

  backButton.disabled = currentIndex === 0;
  nextButton.disabled = selected === null;

  nextButton.textContent =
    currentIndex === questions.length - 1
      ? 'Finish quiz ✦'
      : 'Next question →';
}

// Save the selected answer
function chooseAnswer(optionIndex) {
  selectedAnswers[currentIndex] = optionIndex;
  renderQuestion();
}

// Move to the next question
function goNext() {
  if (selectedAnswers[currentIndex] === null) {
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

// Return to the previous question
function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// Calculate the final score and display results
function showResults() {
  const totalCorrect = questions.reduce(
    (total, question, index) => {
      return total +
        (selectedAnswers[index] === question.answer ? 1 : 0);
    },
    0
  );

  quizPanel.hidden = true;
  resultsPanel.hidden = false;

  progressLabel.textContent = 'Quiz completed';

  progressTrack.setAttribute(
    'aria-valuenow',
    String(questions.length)
  );

  progressFill.style.width = '100%';

  scoreElement.textContent =
    `${totalCorrect} / ${questions.length}`;

  if (totalCorrect === questions.length) {
    resultTitle.textContent = 'A true Hogwarts legend!';
    resultMessage.textContent =
      'Perfect score! Your knowledge of the wizarding world is extraordinary.';
  } else if (totalCorrect >= 15) {
    resultTitle.textContent = 'Outstanding, wizard!';
    resultMessage.textContent =
      'Excellent work! You know the wizarding world very well.';
  } else if (totalCorrect >= 10) {
    resultTitle.textContent = 'A promising spellcaster!';
    resultMessage.textContent =
      'Good effort! Review your answers below and keep learning.';
  } else {
    resultTitle.textContent = 'Your journey is just beginning!';
    resultMessage.textContent =
      'Every great witch or wizard starts somewhere. Review your answers and try again.';
  }

  renderReview();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show each selected answer and the correct answer
function renderReview() {
  reviewList.replaceChildren();

  questions.forEach((question, index) => {
    const chosen = selectedAnswers[index];
    const isCorrect = chosen === question.answer;

    const item = document.createElement('article');
    item.className = `review-item ${
      isCorrect ? 'correct' : 'incorrect'
    }`;

    const heading = document.createElement('p');
    heading.className = 'review-question';
    heading.textContent = `${index + 1}. ${question.question}`;

    const status = document.createElement('p');
    status.className = 'review-answer status';
    status.textContent = isCorrect ? '✓ Correct' : '✗ Not quite';

    const yourAnswer = document.createElement('p');
    yourAnswer.className = 'review-answer';

    const yourLabel = document.createElement('strong');
    yourLabel.textContent = 'Your answer: ';

    yourAnswer.append(
      yourLabel,
      document.createTextNode(
        chosen === null
          ? 'Not answered'
          : question.options[chosen]
      )
    );

    const correctAnswer = document.createElement('p');
    correctAnswer.className = 'review-answer';

    const correctLabel = document.createElement('strong');
    correctLabel.textContent = 'Correct answer: ';

    correctAnswer.append(
      correctLabel,
      document.createTextNode(question.options[question.answer])
    );

    item.append(
      heading,
      status,
      yourAnswer,
      correctAnswer
    );

    reviewList.appendChild(item);
  });
}

// Restart the entire quiz
function restartQuiz() {
  currentIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);

  resultsPanel.hidden = true;
  quizPanel.hidden = false;

  renderQuestion();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Button event listeners
nextButton.addEventListener('click', goNext);
backButton.addEventListener('click', goBack);
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
renderQuestion();

'use strict';

const questions = [
  {
    question: "What is the name of the school Harry Potter attends?",
    options: [
      "Beauxbatons Academy",
      "Hogwarts School of Witchcraft and Wizardry",
      "Durmstrang Institute",
      "Ilvermorny School"
    ],
    answer: 1
  },
  {
    question: "What is Harry Potter's house at Hogwarts?",
    options: ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"],
    answer: 2
  },
  {
    question: "What is the name of Harry Potter's owl?",
    options: ["Crookshanks", "Hedwig", "Errol", "Pigwidgeon"],
    answer: 1
  },
  {
    question: "Who are Harry's two best friends?",
    options: [
      "Fred and George",
      "Neville and Luna",
      "Cedric and Cho",
      "Ron Weasley and Hermione Granger"
    ],
    answer: 3
  },
  {
    question: "What position does Harry play on his Quidditch team?",
    options: ["Keeper", "Beater", "Seeker", "Chaser"],
    answer: 2
  },
  {
    question: "What is the name of the bank used by wizards?",
    options: [
      "Gringotts",
      "Ollivanders",
      "Flourish and Blotts",
      "The Leaky Cauldron"
    ],
    answer: 0
  },
  {
    question: "Who is the headmaster of Hogwarts for most of Harry's early years?",
    options: [
      "Severus Snape",
      "Albus Dumbledore",
      "Minerva McGonagall",
      "Rubeus Hagrid"
    ],
    answer: 1
  },
  {
    question: "What platform does the Hogwarts Express depart from?",
    options: [
      "Platform 7½",
      "Platform 10",
      "Platform 8¾",
      "Platform 9¾"
    ],
    answer: 3
  },
  {
    question: "What is the name of the magical sport played on flying broomsticks?",
    options: [
      "Gobstones",
      "Quidditch",
      "Exploding Snap",
      "Wizard Chess"
    ],
    answer: 1
  },
  {
    question: "What spell is commonly used to disarm an opponent?",
    options: [
      "Lumos",
      "Expecto Patronum",
      "Expelliarmus",
      "Alohomora"
    ],
    answer: 2
  },
  {
    question: "What is the name of Voldemort's pet snake?",
    options: ["Nagini", "Aragog", "Basilisk", "Fang"],
    answer: 0
  },
  {
    question: "Which object reveals a person's deepest desire?",
    options: [
      "The Pensieve",
      "The Mirror of Erised",
      "The Marauder's Map",
      "The Goblet of Fire"
    ],
    answer: 1
  },
  {
    question: "Who gives Harry the Invisibility Cloak during his first Christmas at Hogwarts?",
    options: [
      "Hagrid",
      "Sirius Black",
      "Albus Dumbledore, anonymously",
      "Ron Weasley"
    ],
    answer: 2
  },
  {
    question: "What are the three Deathly Hallows?",
    options: [
      "Elder Wand, Resurrection Stone, Invisibility Cloak",
      "Elder Wand, Philosopher's Stone, Marauder's Map",
      "Time-Turner, Elder Wand, Goblet of Fire",
      "Resurrection Stone, Horcrux, Sorting Hat"
    ],
    answer: 0
  },
  {
    question: "What is the name of Hermione's cat?",
    options: ["Scabbers", "Crookshanks", "Mrs. Norris", "Trevor"],
    answer: 1
  },
  {
    question: "Which magical creature is Buckbeak?",
    options: ["Thestral", "Phoenix", "Hippogriff", "Dragon"],
    answer: 2
  },
  {
    question: "Which house-elf serves the Malfoy family before becoming free?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    answer: 2
  },
  {
    question: "Who was disguised as Mad-Eye Moody during Harry's fourth year?",
    options: [
      "Peter Pettigrew",
      "Barty Crouch Jr.",
      "Lucius Malfoy",
      "Igor Karkaroff"
    ],
    answer: 1
  },
  {
    question: "Which Horcrux does Ron destroy with the Sword of Gryffindor?",
    options: [
      "Ravenclaw's diadem",
      "Hufflepuff's cup",
      "Slytherin's locket",
      "Marvolo Gaunt's ring"
    ],
    answer: 2
  },
  {
    question: "What is the name of the village near Hogwarts with shops such as Honeydukes?",
    options: [
      "Godric's Hollow",
      "Little Whinging",
      "Diagon Alley",
      "Hogsmeade"
    ],
    answer: 3
  }
];

// HTML elements
const progressLabel = document.getElementById('progress-label');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');
const questionNumber = document.getElementById('question-number');
const questionHeading = document.getElementById('quiz-heading');
const optionsContainer = document.getElementById('options');
const selectionNote = document.getElementById('selection-note');

const backButton = document.getElementById('back-btn');
const nextButton = document.getElementById('next-btn');

const quizPanel = document.getElementById('quiz-panel');
const resultsPanel = document.getElementById('results-panel');

const resultTitle = document.getElementById('result-title');
const scoreElement = document.getElementById('score');
const resultMessage = document.getElementById('result-message');
const reviewList = document.getElementById('review-list');
const restartButton = document.getElementById('restart-btn');

// Quiz state
let currentIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);

// Display the current question
function renderQuestion() {
  const current = questions[currentIndex];
  const selected = selectedAnswers[currentIndex];

  progressLabel.textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;

  progressTrack.setAttribute(
    'aria-valuenow',
    String(currentIndex + 1)
  );

  progressFill.style.width =
    `${((currentIndex + 1) / questions.length) * 100}%`;

  questionNumber.textContent =
    `QUESTION ${String(currentIndex + 1).padStart(2, '0')}`;

  questionHeading.textContent = current.question;
  optionsContainer.replaceChildren();

  current.options.forEach((optionText, optionIndex) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'option';
    button.setAttribute(
      'aria-pressed',
      String(selected === optionIndex)
    );

    if (selected === optionIndex) {
      button.classList.add('selected');
    }

    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = String.fromCharCode(65 + optionIndex);

    const text = document.createElement('span');
    text.className = 'option-text';
    text.textContent = optionText;

    button.append(letter, text);

    button.addEventListener('click', () => {
      chooseAnswer(optionIndex);
    });

    optionsContainer.appendChild(button);
  });

  selectionNote.textContent = selected === null
    ? 'Choose one answer to continue.'
    : 'Answer selected. You can change it before continuing.';

  backButton.disabled = currentIndex === 0;
  nextButton.disabled = selected === null;

  nextButton.textContent =
    currentIndex === questions.length - 1
      ? 'Finish quiz ✦'
      : 'Next question →';
}

// Save the selected answer
function chooseAnswer(optionIndex) {
  selectedAnswers[currentIndex] = optionIndex;
  renderQuestion();
}

// Move to the next question
function goNext() {
  if (selectedAnswers[currentIndex] === null) {
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

// Return to the previous question
function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// Calculate the final score and display results
function showResults() {
  const totalCorrect = questions.reduce(
    (total, question, index) => {
      return total +
        (selectedAnswers[index] === question.answer ? 1 : 0);
    },
    0
  );

  quizPanel.hidden = true;
  resultsPanel.hidden = false;

  progressLabel.textContent = 'Quiz completed';

  progressTrack.setAttribute(
    'aria-valuenow',
    String(questions.length)
  );

  progressFill.style.width = '100%';

  scoreElement.textContent =
    `${totalCorrect} / ${questions.length}`;

  if (totalCorrect === questions.length) {
    resultTitle.textContent = 'A true Hogwarts legend!';
    resultMessage.textContent =
      'Perfect score! Your knowledge of the wizarding world is extraordinary.';
  } else if (totalCorrect >= 15) {
    resultTitle.textContent = 'Outstanding, wizard!';
    resultMessage.textContent =
      'Excellent work! You know the wizarding world very well.';
  } else if (totalCorrect >= 10) {
    resultTitle.textContent = 'A promising spellcaster!';
    resultMessage.textContent =
      'Good effort! Review your answers below and keep learning.';
  } else {
    resultTitle.textContent = 'Your journey is just beginning!';
    resultMessage.textContent =
      'Every great witch or wizard starts somewhere. Review your answers and try again.';
  }

  renderReview();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show each selected answer and the correct answer
function renderReview() {
  reviewList.replaceChildren();

  questions.forEach((question, index) => {
    const chosen = selectedAnswers[index];
    const isCorrect = chosen === question.answer;

    const item = document.createElement('article');
    item.className = `review-item ${
      isCorrect ? 'correct' : 'incorrect'
    }`;

    const heading = document.createElement('p');
    heading.className = 'review-question';
    heading.textContent = `${index + 1}. ${question.question}`;

    const status = document.createElement('p');
    status.className = 'review-answer status';
    status.textContent = isCorrect ? '✓ Correct' : '✗ Not quite';

    const yourAnswer = document.createElement('p');
    yourAnswer.className = 'review-answer';

    const yourLabel = document.createElement('strong');
    yourLabel.textContent = 'Your answer: ';

    yourAnswer.append(
      yourLabel,
      document.createTextNode(
        chosen === null
          ? 'Not answered'
          : question.options[chosen]
      )
    );

    const correctAnswer = document.createElement('p');
    correctAnswer.className = 'review-answer';

    const correctLabel = document.createElement('strong');
    correctLabel.textContent = 'Correct answer: ';

    correctAnswer.append(
      correctLabel,
      document.createTextNode(question.options[question.answer])
    );

    item.append(
      heading,
      status,
      yourAnswer,
      correctAnswer
    );

    reviewList.appendChild(item);
  });
}

// Restart the entire quiz
function restartQuiz() {
  currentIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);

  resultsPanel.hidden = true;
  quizPanel.hidden = false;

  renderQuestion();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Button event listeners
nextButton.addEventListener('click', goNext);
backButton.addEventListener('click', goBack);
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
renderQuestion();
