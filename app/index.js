import {grab, element, DOMScrubber} from '../utils/DOM/DOM';
import fahrToCels from '../utils/wasm/fahrToCels.js';
import fahrToCelsModule from './utils/wasm/fahrToCels.wasm';

const module = fahrToCels({
  locateFile(path) {
    if(path.endsWith('.wasm')) {
      return fahrToCellsModule;
    }
    return path;
  }
});


module.onRuntimeInitialized = () => {
  console.log(module._fahrToCels(90));
};

window.onload = () => {
  grab('body').append(element({
    tagName: 'form',
    attributes: {
      id: 'fahr-form',
      class: 'fahr-form',
    },
    innerHTML: [
      {
        tagName: 'input',
        attributes: {
          id: 'fahr-input',
          class: 'search-bar',
          type: 'text',
          placeholder: 'Input Fahrenheit temperature'
        }
      },
      {
        tagName: 'button',
        attributes: {
          id: 'button',
          class: 'btn search-btn'
        },
        text: 'Convert'
      }
    ]
  }));

  grab('button').addEventListener('click', (event) => {
    event.preventDefault();
    const celsiusValue = module.fahrToCels(90);

    console.log(celsiusValue);
  });
}