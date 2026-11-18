// Quiz questions and browser behaviour for QuizMaster.
const quizzes = {
  html: { title: "HTML Quiz", questions: [
    { q: "What does HTML describe?", options: ["The structure of web content", "The colour of a page", "A database"], answer: 0, explain: "HTML gives web content its structure and meaning." },
    { q: "Which element creates a hyperlink?", options: ["<link>", "<a>", "<href>"], answer: 1, explain: "The anchor element <a> creates a hyperlink." },
    { q: "Which element is the largest default heading?", options: ["<h6>", "<head>", "<h1>"], answer: 2, explain: "<h1> is the top-level heading." },
    { q: "Which attribute describes an image for screen readers?", options: ["alt", "src", "href"], answer: 0, explain: "The alt attribute supplies alternative text." },
    { q: "Which element makes an unordered list?", options: ["<ol>", "<ul>", "<li>"], answer: 1, explain: "<ul> creates an unordered list; <li> marks each item." },
    { q: "Which declaration identifies an HTML5 document?", options: ["<!DOCTYPE html>", "<html5>", "<doctype>"], answer: 0, explain: "The doctype declaration tells browsers to use modern HTML standards mode." },
    { q: "Where should the page language be declared?", options: ["On <body>", "On the <html> element with lang", "In a CSS rule"], answer: 1, explain: "The lang attribute on <html> identifies the document language." },
    { q: "Which semantic element is used for site navigation links?", options: ["<aside>", "<section>", "<nav>"], answer: 2, explain: "<nav> marks a section containing navigation links." },
    { q: "Which element usually contains the page's main unique content?", options: ["<main>", "<footer>", "<head>"], answer: 0, explain: "<main> identifies the primary content of a document." },
    { q: "Which attribute gives a link its destination?", options: ["src", "href", "alt"], answer: 1, explain: "The href attribute contains a link's destination." },
    { q: "Which label attribute connects a label to an input id?", options: ["name", "value", "for"], answer: 2, explain: "The label's for value should match the input's id." },
    { q: "Which button type submits a form?", options: ["type=\"submit\"", "type=\"reset\"", "type=\"menu\""], answer: 0, explain: "type=\"submit\" makes a button submit its form." },
    { q: "Which table element defines a header cell?", options: ["<th>", "<td>", "<tr>"], answer: 0, explain: "<th> marks a table header cell." },
    { q: "Which syntax creates an HTML comment?", options: ["// comment", "/* comment */", "<!-- comment -->"], answer: 2, explain: "HTML comments begin with <!-- and end with -->." },
    { q: "Which element creates a numbered list?", options: ["<ul>", "<ol>", "<dl>"], answer: 1, explain: "<ol> creates an ordered, typically numbered list." }
  ]},
  css: { title: "CSS Quiz", questions: [
    { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Syntax", "Creative Sheet System"], answer: 0, explain: "CSS means Cascading Style Sheets." },
    { q: "Which property changes text colour?", options: ["font-color", "color", "text-style"], answer: 1, explain: "The color property sets the text colour." },
    { q: "Which symbol selects an element by its id?", options: [".", "#", "*"], answer: 1, explain: "A hash (#) selects an id; a dot selects a class." },
    { q: "Which declaration makes text bold?", options: ["font-weight: bold", "text: bold", "font-style: heavy"], answer: 0, explain: "font-weight controls how bold text appears." },
    { q: "Which CSS layout is designed for rows and columns?", options: ["Grid", "Float", "Inline"], answer: 0, explain: "CSS Grid is designed for two-dimensional layouts." },
    { q: "Which property adds space outside an element's border?", options: ["margin", "padding", "outline"], answer: 0, explain: "Margin creates space outside an element's border." },
    { q: "Which selector targets elements with class=\"card\"?", options: ["#card", ".card", "card()"], answer: 1, explain: "A dot followed by a class name selects class members." },
    { q: "In a flex row, what does justify-content commonly align?", options: ["Text decoration", "Border thickness", "Items along the main axis"], answer: 2, explain: "justify-content distributes flex items along the main axis." },
    { q: "Which feature applies styles at a chosen viewport width?", options: ["Media query", "CSS variable", "Pseudo-element"], answer: 0, explain: "A media query can apply CSS based on viewport conditions." },
    { q: "What does box-sizing: border-box do?", options: ["Hides the border", "Includes padding and border in the set size", "Adds a shadow"], answer: 1, explain: "With border-box, declared width includes content, padding, and border." },
    { q: "Which property adds space between content and its border?", options: ["margin", "gap", "padding"], answer: 2, explain: "Padding is the space between content and its border." },
    { q: "Which property sets an element's background colour?", options: ["background-color", "font-color", "fill-text"], answer: 0, explain: "background-color sets the background colour." },
    { q: "The rem unit is based on the font size of which element?", options: ["The nearest parent", "The root element", "The current image"], answer: 1, explain: "rem is relative to the root element's font size." },
    { q: "Which pseudo-class applies while a pointer is over an element?", options: ["::before", ":hover", ":root"], answer: 1, explain: ":hover matches while the pointer is over an element." },
    { q: "Which declaration turns an element into a grid container?", options: ["display: grid", "position: grid", "layout: columns"], answer: 0, explain: "display: grid establishes a CSS Grid formatting context." }
  ]},
  python: { title: "Python Quiz", questions: [
    { q: "Which function displays output in Python?", options: ["echo()", "print()", "show()"], answer: 1, explain: "print() writes output to the terminal." },
    { q: "Which character begins a Python comment?", options: ["//", "#", "<!--"], answer: 1, explain: "A hash (#) begins a single-line Python comment." },
    { q: "Which collection is ordered and changeable?", options: ["tuple", "list", "set"], answer: 1, explain: "A list is ordered and can be changed after creation." },
    { q: "What is the result of 3 ** 2?", options: ["6", "9", "5"], answer: 1, explain: "The ** operator means exponentiation: 3 squared is 9." },
    { q: "Which keyword defines a function?", options: ["function", "def", "make"], answer: 1, explain: "Python functions are defined with def." },
    { q: "Which built-in function returns the number of items in a list?", options: ["count(list)", "size(list)", "len(list)"], answer: 2, explain: "len() returns the number of items in a collection." },
    { q: "Which collection is immutable?", options: ["tuple", "list", "dictionary"], answer: 0, explain: "A tuple cannot be changed after it is created." },
    { q: "Which data structure stores key-value pairs?", options: ["list", "dictionary", "string"], answer: 1, explain: "A dictionary maps keys to values." },
    { q: "Which keyword begins a loop over items in a collection?", options: ["repeat", "loop", "for"], answer: 2, explain: "A for loop iterates over items in an iterable." },
    { q: "Which values represent Boolean truth in Python?", options: ["True and False", "Yes and No", "On and Off"], answer: 0, explain: "Python's Boolean values are True and False." },
    { q: "What does 10 % 3 evaluate to?", options: ["3", "1", "0"], answer: 1, explain: "% gives the remainder; 10 divided by 3 leaves 1." },
    { q: "How do you access the first item in a list named items?", options: ["items[1]", "items.first", "items[0]"], answer: 2, explain: "Python sequence indexes start at zero." },
    { q: "Which block handles an exception?", options: ["try", "check", "catch"], answer: 0, explain: "Python uses try with except to handle exceptions." },
    { q: "What does input() return by default?", options: ["An integer", "A string", "A Boolean"], answer: 1, explain: "input() returns the entered text as a string." },
    { q: "Which keyword skips to the next loop iteration?", options: ["break", "pass", "continue"], answer: 2, explain: "continue skips the rest of the current iteration." }
  ]},
  java: { title: "Java Quiz", questions: [
    { q: "Which keyword declares a class in Java?", options: ["class", "define", "struct"], answer: 0, explain: "Java uses the class keyword to declare a class." },
    { q: "Which method is the common Java program entry point?", options: ["start()", "main()", "run()"], answer: 1, explain: "Programs commonly begin in public static void main." },
    { q: "Which type stores a whole number?", options: ["int", "boolean", "char[]"], answer: 0, explain: "int is a primitive type for integer values." },
    { q: "Which symbol ends a Java statement?", options: [":", ";", "."], answer: 1, explain: "Java statements commonly end with a semicolon." },
    { q: "Which keyword creates a new object?", options: ["new", "make", "this"], answer: 0, explain: "The new keyword creates an object instance." },
    { q: "Which keyword inherits a class?", options: ["extends", "inherits", "implements"], answer: 0, explain: "A Java class uses extends to inherit another class." },
    { q: "Which keyword declares that a class uses an interface?", options: ["extends", "implements", "interface"], answer: 1, explain: "A class uses implements to provide an interface's methods." },
    { q: "Which Java type stores true or false?", options: ["int", "String", "boolean"], answer: 2, explain: "boolean stores one of the values true or false." },
    { q: "Which method prints a line to the console?", options: ["System.out.println()", "Console.printline()", "print()"], answer: 0, explain: "System.out.println writes text and a newline to standard output." },
    { q: "Which keyword makes a variable unassignable after initialization?", options: ["static", "final", "private"], answer: 1, explain: "A final variable can be assigned only once." },
    { q: "Which keyword makes a method belong to the class rather than an instance?", options: ["public", "void", "static"], answer: 2, explain: "static members belong to the class itself." },
    { q: "Which access modifier allows access from any class?", options: ["public", "private", "protected"], answer: 0, explain: "public members can be accessed wherever the class is accessible." },
    { q: "What is a constructor used for?", options: ["Ending a loop", "Initializing a new object", "Importing a package"], answer: 1, explain: "A constructor initializes an object when it is created." },
    { q: "Which keyword refers to the current object?", options: ["super", "self", "this"], answer: 2, explain: "this refers to the current object instance in Java." },
    { q: "Which package is automatically imported in every Java source file?", options: ["java.lang", "java.util", "java.io"], answer: 0, explain: "Types in java.lang are available without an import statement." }
  ]},
  gk: { title: "General Knowledge Quiz", questions: [
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: 1, explain: "Iron-rich dust gives Mars its reddish appearance." },
    { q: "How many continents are commonly counted on Earth?", options: ["Five", "Seven", "Nine"], answer: 1, explain: "The commonly taught model has seven continents." },
    { q: "What is the largest ocean?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"], answer: 2, explain: "The Pacific Ocean is the largest." },
    { q: "Which is the largest mammal?", options: ["African elephant", "Blue whale", "Giraffe"], answer: 1, explain: "The blue whale is the largest known animal." },
    { q: "What is the capital city of Japan?", options: ["Tokyo", "Kyoto", "Osaka"], answer: 0, explain: "Tokyo is the capital of Japan." },
    { q: "Which gas makes up most of Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen"], answer: 2, explain: "Nitrogen makes up about 78% of Earth's atmosphere." },
    { q: "How many sides does a hexagon have?", options: ["Six", "Five", "Eight"], answer: 0, explain: "A hexagon has six sides." },
    { q: "Which instrument measures temperature?", options: ["Barometer", "Thermometer", "Compass"], answer: 1, explain: "A thermometer measures temperature." },
    { q: "Which is the largest hot desert on Earth?", options: ["Gobi Desert", "Arabian Desert", "Sahara Desert"], answer: 2, explain: "The Sahara is the world's largest hot desert." },
    { q: "Which organ pumps blood around the human body?", options: ["Heart", "Lung", "Kidney"], answer: 0, explain: "The heart pumps blood through the circulatory system." },
    { q: "What is the currency of Japan?", options: ["Won", "Yen", "Yuan"], answer: 1, explain: "Japan's currency is the yen." },
    { q: "Which star is closest to Earth?", options: ["Sirius", "Polaris", "The Sun"], answer: 2, explain: "The Sun is the star closest to Earth." },
    { q: "What is the process by which plants make food using sunlight?", options: ["Photosynthesis", "Evaporation", "Fermentation"], answer: 0, explain: "Photosynthesis converts sunlight into stored chemical energy in plants." },
    { q: "Which gas do plants absorb from the air?", options: ["Oxygen", "Carbon dioxide", "Helium"], answer: 1, explain: "Plants absorb carbon dioxide during photosynthesis." },
    { q: "What is the boiling point of water at sea level?", options: ["100°C", "50°C", "150°C"], answer: 0, explain: "At standard sea-level pressure, water boils at 100°C." }
  ]}
};

const params = new URLSearchParams(window.location.search);
const requestedTopic = (params.get("topic") || "html").toLowerCase();
const topicKey = quizzes[requestedTopic] ? requestedTopic : "html";
const quiz = quizzes[topicKey];
const QUIZ_SECONDS = 110;
let timerInterval;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remaining = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function renderQuiz() {
  const title = document.querySelector("#quiz-title");
  const list = document.querySelector("#question-list");
  const form = document.querySelector("#quiz-form");
  if (!title || !list || !form) return;
  title.textContent = quiz.title;
  document.querySelector(".quiz-page .lead").textContent = `Answer all 15 questions in 110 seconds. Your score and answer review appear when you submit or the timer ends.`;
  const timerPanel = document.createElement("section");
  timerPanel.className = "quiz-timer-panel";
  timerPanel.setAttribute("aria-label", "Quiz timer");
  timerPanel.innerHTML = `<div class="timer-caption"><span>Time remaining</span><strong id="quiz-timer" role="timer" aria-live="off">${formatTime(QUIZ_SECONDS)}</strong></div><div class="timer-track" aria-hidden="true"><span id="timer-progress"></span></div>`;
  form.insertBefore(timerPanel, list);
  quiz.questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    const legend = document.createElement("legend");
    legend.textContent = `${String(index + 1).padStart(2, "0")} · ${question.q}`;
    fieldset.append(legend);
    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "answer";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = String(optionIndex);
      input.required = true;
      const text = document.createElement("span");
      text.textContent = option;
      label.append(input, text);
      fieldset.append(label);
    });
    list.append(fieldset);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    finishQuiz(false);
  });
  let timeLeft = QUIZ_SECONDS;
  timerInterval = window.setInterval(() => {
    timeLeft -= 1;
    document.querySelector("#quiz-timer").textContent = formatTime(timeLeft);
    document.querySelector("#timer-progress").style.width = `${(timeLeft / QUIZ_SECONDS) * 100}%`;
    timerPanel.classList.toggle("timer-warning", timeLeft <= 15);
    if (timeLeft <= 0) finishQuiz(true);
  }, 1000);

  let isFinishing = false;
  async function finishQuiz(timedOut) {
    if (isFinishing) return;
    isFinishing = true;
    window.clearInterval(timerInterval);
    const data = new FormData(form);
    const answers = quiz.questions.map((_, index) => data.has(`q${index}`) ? Number(data.get(`q${index}`)) : null);
    const error = document.querySelector("#quiz-error");
    error.textContent = timedOut ? "Time ended. Saving your result…" : "Saving your result…";
    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: topicKey, answers, timedOut })
      });
      const result = await response.json();
      if (response.status === 401) {
        const next = encodeURIComponent(`${window.location.pathname.slice(1)}${window.location.search}`);
        window.location.assign(`login.html?next=${next}`);
        return;
      }
      if (!response.ok) throw new Error(result.error || "Could not save the quiz result.");
      const record = {
        topic: result.category,
        score: result.correctAnswers,
        total: result.totalQuestions,
        title: quiz.title,
        answers,
        questions: quiz.questions,
        timedOut: result.timedOut
      };
      sessionStorage.setItem("quizmakerResult", JSON.stringify(record));
      window.location.href = "result.html";
    } catch (saveError) {
      isFinishing = false;
      error.textContent = saveError.message.includes("Failed to fetch")
        ? "Could not reach QuizMaster. Keep the server running and retry submitting your quiz."
        : saveError.message;
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = "Retry saving result";
    }
  }
}

function renderResult() {
  const scoreEl = document.querySelector("#result-score");
  if (!scoreEl) return;
  let record;
  try { record = JSON.parse(sessionStorage.getItem("quizmakerResult")); } catch { record = null; }
  if (!record) {
    document.querySelector("#result-title").textContent = "No quiz result yet";
    scoreEl.textContent = "Take a quiz to see your score.";
    document.querySelector("#result-message").textContent = "Choose a category to begin practising.";
    document.querySelector("#answer-review").replaceChildren();
    return;
  }
  document.title = `${record.title} Result | QuizMaster`;
  document.querySelector("#result-title").textContent = `${record.title} complete!`;
  if (record.timedOut) document.querySelector("#result-title").textContent = "Time is up!";
  scoreEl.textContent = `${record.score} / ${record.total} correct`;
  document.querySelector("#result-message").textContent = record.timedOut ? `You ran out of time on ${record.title}. Review the answers below and try again.` : record.score === record.total ? "Perfect score! Excellent work." : record.score >= 3 ? "Good work. Review the explanations and keep practising." : "Every try helps you learn. Review the answers and try again.";
  document.querySelector("#retry-link").href = `quiz.html?topic=${encodeURIComponent(record.topic)}`;
  const review = document.querySelector("#answer-review");
  record.questions.forEach((question, index) => {
    const item = document.createElement("article");
    item.className = "review-item";
    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${question.q}`;
    const selected = document.createElement("p");
    selected.textContent = record.answers[index] === null ? "Your answer: Not answered" : `Your answer: ${question.options[record.answers[index]]}`;
    const explanation = document.createElement("p");
    explanation.textContent = `Correct answer: ${question.options[question.answer]}. ${question.explain}`;
    item.append(heading, selected, explanation);
    review.append(item);
  });
}

async function startQuizForSignedInUser() {
  if (!document.querySelector("#quiz-form")) return;
  try {
    const response = await fetch("/api/auth/me");
    if (response.status === 401) {
      const next = encodeURIComponent(`${window.location.pathname.slice(1)}${window.location.search}`);
      window.location.replace(`login.html?next=${next}`);
      return;
    }
    if (!response.ok) throw new Error("Could not verify your account.");
    renderQuiz();
  } catch (error) {
    document.querySelector("#quiz-title").textContent = "QuizMaster server unavailable";
    document.querySelector(".quiz-page .lead").textContent = "Run npm start from the project folder and reload this page to take a quiz.";
  }
}

startQuizForSignedInUser();
renderResult();
