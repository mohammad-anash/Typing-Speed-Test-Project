// html parts
const mainContainer = createAndAppend(
  "div",
  "class",
  "container",
  document.body
);

const firstHeading = createAndAppend("h1", null, null, mainContainer);
firstHeading.innerText = "Typing Speed Test";

const selection = createAndAppend(
  "select",
  "class",
  "select",
  mainContainer,
  "change"
);

function createOptions(n) {
  for (let i = 1; i <= n; i++) {
    const options = document.createElement("option");
    options.textContent = `${i * 5}000`;
    options.value = `${i * 5}000`;
    selection.appendChild(options);
  }
}
createOptions(4);

const myForm = createAndAppend("form", null, null, mainContainer);
const textArea = createAndAppend(
  "textarea",
  "class",
  "textarea",
  myForm,
  "keyup",
  80,
  10
);

const result = createAndAppend("p", "class", "para", mainContainer);

function createAndAppend(ele, attType, attName, appendWith, event, cols, rows) {
  const element = document.createElement(ele);

  if (!!attType && !!attName) {
    element.setAttribute(attType, attName);
  }
  if (!!appendWith) {
    appendWith.appendChild(element);
  }

  if (ele === "textarea") {
    if (!!cols) {
      element.setAttribute("cols", cols);
    }
    if (!!rows) {
      element.setAttribute("rows", rows);
    }
  }

  if (event === "change") {
    const selectors = document.querySelector(".select");
    selectors.addEventListener(event, getSomeTime);
  }
  if (event === "keyup") {
    const selectTextArea = document.querySelector(".textarea");
    selectTextArea.addEventListener(event, getText);
  }

  return element;
}

let currentTime;
function getSomeTime(e) {
  const timer = Number(e.target.value);
  currentTime = timer;
  setTimeout(() => {
    textArea.disabled = true;
    countWordsAndLetters();
  }, timer);
  textArea.disabled = false;
}

function getText() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const text = textArea.value;

  const firstLetter = text.charAt(0);
  const checkLetter = alphabets
    .split("")
    .some((char) => char.includes(firstLetter));

  const selectoptions = Array.from(document.querySelectorAll("select option"));

  selectoptions.forEach((options) => {
    options.addEventListener("change", function (e) {
      const time = e.target.value;
      console.log(time);
      if (checkLetter) {
        getSomeTime(time);
      }
    });
  });
}

function countWordsAndLetters() {
  const text = textArea.value;

  const words = text.split(" ").length;
  const letter = text.replaceAll(" ", "").length;

  return (result.innerText = `You Write ${words} Words And ${letter} Letters in ${currentTime} mili second`);
}
