fetch('./out/main.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  instance = results.instance;

  let form = document.getElementById("temp-form");
  let input = document.getElementById("temp-input");

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  form.addEventListener('click', () => {
    if (getRadioVal(form, 'temp') === 'fahrenheit') {
      document.getElementById('temp-symbol').textContent = '°F';
    } else {
      document.getElementById('temp-symbol').textContent = '°C';
    }
    useInput();
  });

  // Resize input to content

  input.addEventListener('input', resizeInput);
  resizeInput.call(input);

  function resizeInput() {
    this.style.width = this.value.length + 0.1 + "ch";
  }

  input.oninput = useInput;

  function useInput() {
    const inputValue = input.value;
    const radioValue = getRadioVal(form, 'temp');

    const testExp = new RegExp('^[-]?([0-9]{0,})*$', 'g');

    if (input.value === '-') {
      document.getElementById("result-container").textContent = 'Write some numbers too!';
    } else if (radioValue === 'fahrenheit' && inputValue !== '' && inputValue.match(testExp)) {
      document.getElementById("result-container").textContent = instance.exports.fahrToCels(inputValue) + ' °C';
    } else if (radioValue === 'celsius' && inputValue !== '' && inputValue.match(testExp)) {
      document.getElementById("result-container").textContent = instance.exports.celsToFahr(inputValue) + ' °F';
    } else if (input.value === '') {
      document.getElementById("result-container").textContent = '';
    } else {
      input.value = '';
      document.getElementById("result-container").textContent = 'Try some numbers, idiot';
      setTimeout(() => {
        document.getElementById("result-container").textContent = '';
      } , 3000);
    }
  }

}).catch(console.error);

function getRadioVal(form, name) {
  var val;
  var radios = form.elements[name];
  for (var i=0, len=radios.length; i<len; i++) {
    if ( radios[i].checked ) { 
      val = radios[i].value;
      break;
    }
  }
  return val;
}

function inputFocus() {
  document.getElementById("temp-input").focus();
}

window.onload = () => {
  if (getRadioVal(document.getElementById('temp-form'), 'temp') === 'fahrenheit') {
    document.getElementById('temp-symbol').textContent = '°F';
  } else {
    document.getElementById('temp-symbol').textContent = '°C';
  }
}