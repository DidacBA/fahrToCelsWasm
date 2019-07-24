function element(nodeElement) {
  const {
    tagName,
    attributes,
    text,
    innerHTML
  } = nodeElement;

  const el = document.createElement(tagName);
  const attributesList = Object.entries(attributes);

  attributesList.map(([attributeName, attribute]) => {
    const attrName = attributeName.replace(/_/g, '-');
    el.setAttribute(attrName, attribute);
  })

  if (text) {
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
  }

  if (innerHTML) {
    innerHTML.map((elem) => {
      el.appendChild(element(elem))
    })
  }

  return el;
}

function grab(id) {
  return document.getElementById(id);
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function DOMScrubber(idsToScrub) {
  idsToScrub.map((id) => {
    grab(id) ? grab(id).remove() : null
  });
}