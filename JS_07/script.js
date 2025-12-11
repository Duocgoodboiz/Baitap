const quoteTextElement = document.getElementById("quoteText");
const quoteAuthorElement = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

let quotesData = [];

async function fetchQuotes() {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) {
      throw new Error("Không thể tải file dữ liệu");
    }

    quotesData = await response.json();

    displayRandomQuote();
  } catch (error) {
    console.error("Lỗi:", error);
    quoteTextElement.innerText = "Đã xảy ra lỗi khi tải dữ liệu!";
    quoteAuthorElement.innerText = "";
  }
}

function displayRandomQuote() {
  if (quotesData.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  const randomQuote = quotesData[randomIndex];
  quoteTextElement.innerText = `"${randomQuote.text}"`;
  quoteAuthorElement.innerText = `- ${randomQuote.author}`;
  changeButtonColor();
}
function changeButtonColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  newQuoteBtn.style.backgroundColor = `rgb(${r},${g},${b})`;
}

newQuoteBtn.addEventListener("click", displayRandomQuote);

fetchQuotes();
