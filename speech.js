var speechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

var recognition = new speechRecognition();
recognition.interimResults = true;

var textbox = $('#asPDF');

var instructions = $('#instructions');

var content = '';

recognition.continuous = true;

recognition.onstart = function () {
  instructions.text('Voice recognition is on');
};

recognition.onspeechend = function () {
  instructions.text('no activity');
};

recognition.onerror = function () {
  instructions.text('try again');
};

recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  content += transcript;
  textbox.val(content);
};

$('#start-btn').click(function (event) {
  if (content.length) {
    content += '';
  }
  recognition.start();
});

$('#end-btn').click(function (event) {
  recognition.abort();
});

textbox.on('input', function () {
  content = $(this).val();
});

///////////////
// const notesEl = document.querySelector('.notes');
// const editBtn = document.querySelector('.edit');
// const main = notesEl.querySelector('.main');
// const textArea = notesEl.querySelector('textarea');
// var text = '';
// textArea.value = text;
// main.innerHTML = marked(text);

// editBtn.addEventListener('click', () => {
//   main.classList.toggle('hidden');
//   textArea.classList.toggle('hidden');
// });
// textArea.addEventListener('input', (e) => {
//   console.log(e.target);
//   const { value } = e.target;
//   main.innerHTML = marked(value);
// });
