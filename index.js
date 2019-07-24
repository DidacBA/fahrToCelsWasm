import { grab, element, DOMScrubber } from "./utils/DOM/DOM";

'use strict'

(() => {
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
})()