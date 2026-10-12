const jokeBtn = document.getElementById("jokeBtn");
const motivationBtn = document.getElementById("motivationBtn");
const tipBtn = document.getElementById("tipBtn");

const result = document.getElementById("result");


async function getAIResponse(endpoint) {

  result.textContent = "Generating response... 🤔";

  try {

    const response = await fetch(endpoint);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    if (endpoint === "/joke") {
      result.textContent = data.joke;
    }

    if (endpoint === "/motivation") {
      result.textContent = data.motivation;
    }

    if (endpoint === "/tip-of-the-day") {
      result.textContent = data.tip;
    }

  } catch (error) {

    console.error(error);

    result.textContent = error.message;
  }
}


jokeBtn.addEventListener("click", () => {
  getAIResponse("/joke");
});


motivationBtn.addEventListener("click", () => {
  getAIResponse("/motivation");
});


tipBtn.addEventListener("click", () => {
  getAIResponse("/tip-of-the-day");
});