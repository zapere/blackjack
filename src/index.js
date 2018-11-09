function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = "Rasdf"; 

  return element;
}

// function addCardImage(card, )


document.body.appendChild(component());