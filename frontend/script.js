const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const welcome = document.getElementById("welcome");

const newChat = document.getElementById("newChat");

const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

const modelSelector = document.getElementById("modelSelector");
const modelMenu = document.getElementById("modelMenu");

const suggestions = document.querySelectorAll(".suggestion");


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  if (welcome) {
    welcome.remove();
  }

  addMessage(text, "user");

  input.value = "";

  resizeInput();

  // Front-end demo response
  setTimeout(() => {

    addMessage(
      "This is a front-end demo response. Connect your AI API to generate real responses.",
      "ai"
    );

  }, 700);
}


/* =========================
   ADD MESSAGE
========================= */

function addMessage(text, type) {

  const row = document.createElement("div");

  row.className = `message-row ${type}`;

  const message = document.createElement("div");

  message.className =
    `message ${type === "user"
      ? "user-message"
      : "ai-message"}`;

  message.textContent = text;

  row.appendChild(message);

  chatArea.appendChild(row);

  chatArea.scrollTop = chatArea.scrollHeight;
}


/* =========================
   BUTTON
========================= */

sendButton.addEventListener("click", sendMessage);


/* =========================
   ENTER
========================= */

input.addEventListener("keydown", (event) => {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();

  }

});


/* =========================
   AUTO RESIZE
========================= */

function resizeInput() {

  input.style.height = "auto";

  input.style.height =
    Math.min(input.scrollHeight, 180) + "px";
}

input.addEventListener("input", resizeInput);


/* =========================
   NEW CHAT
========================= */

newChat.addEventListener("click", () => {

  chatArea.innerHTML = `
    <div class="welcome" id="welcome">

      <div class="logo-mark">
        ∞
      </div>

      <h1>What can I help with?</h1>

      <p>
        Ask anything, explore ideas, write code, or build something new.
      </p>

    </div>
  `;

  input.value = "";

});


/* =========================
   MOBILE SIDEBAR
========================= */

openSidebar.addEventListener("click", () => {

  sidebar.classList.add("open");

  overlay.classList.add("show");

});

closeSidebar.addEventListener("click", closeMobileSidebar);

overlay.addEventListener("click", closeMobileSidebar);

function closeMobileSidebar() {

  sidebar.classList.remove("open");

  overlay.classList.remove("show");

}


/* =========================
   MODEL MENU
========================= */

modelSelector.addEventListener("click", (event) => {

  event.stopPropagation();

  modelMenu.classList.toggle("show");

});


document.addEventListener("click", (event) => {

  if (
    !modelMenu.contains(event.target) &&
    !modelSelector.contains(event.target)
  ) {

    modelMenu.classList.remove("show");

  }

});


/* =========================
   MODEL OPTIONS
========================= */

document.querySelectorAll(".model-option").forEach(option => {

  option.addEventListener("click", () => {

    document
      .querySelectorAll(".model-option")
      .forEach(item => item.classList.remove("active"));

    option.classList.add("active");

    modelMenu.classList.remove("show");

  });

});


/* =========================
   SUGGESTIONS
========================= */

suggestions.forEach(button => {

  button.addEventListener("click", () => {

    const text =
      button.textContent.trim();

    input.value =
      text.replace(/^[^\w]+/, "");

    input.focus();

    resizeInput();

  });

});


/* =========================
   VOICE DEMO
========================= */

const voiceButton =
  document.getElementById("voiceButton");

voiceButton.addEventListener("click", () => {

  if (!("webkitSpeechRecognition" in window)) {

    alert("Speech recognition is not supported in this browser.");

    return;
  }

  const recognition =
    new webkitSpeechRecognition();

  recognition.lang = "en-US";

  recognition.interimResults = false;

  recognition.start();

  voiceButton.textContent = "🔴";

  recognition.onresult = (event) => {

    input.value =
      event.results[0][0].transcript;

    resizeInput();

  };

  recognition.onend = () => {

    voiceButton.textContent = "🎙";

  };

});


/* =========================
   ATTACH BUTTON
========================= */

document
  .getElementById("attachButton")
  .addEventListener("click", () => {

    const fileInput =
      document.createElement("input");

    fileInput.type = "file";

    fileInput.accept =
      "image/*,.pdf,.txt,.doc,.docx";

    fileInput.click();

    fileInput.addEventListener("change", () => {

      if (fileInput.files.length) {

        input.value +=
          ` [Attached: ${fileInput.files[0].name}]`;

        resizeInput();

      }

    });

  });