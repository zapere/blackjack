const assert = require('assert')
const playerHandContainerID = "playerHandContainer";
const dealerHandContainerID = "dealerHandContainer";

function clearCards(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
}

function addCard(containerId, card) {
  const container = document.getElementById(containerId);
  const cardElement = document.createElement("img");
  // '10♠'
  // cardElement.src = "img/cards/10S.png";
  cardElement.src = `img/cards/${getCardFileName(card)}`; // img/cards/10S.png
  cardElement.width = 120;
  cardElement.height = 180;
  container.appendChild(cardElement);
}

function getCardFileName(card) {
  const rank = card.slice(0, card.length - 1)
  const suit = card.slice(-1)
  const suitToLetter = {
    '♠': 'S',
    '♥': 'H',
    '♣': 'C',
    '♦': 'D'
  }
  return rank + suitToLetter[suit] + '.png'
}
assert.strictEqual(getCardFileName(`2♠`), '2S.png')
assert.strictEqual(getCardFileName(`2♥`), '2H.png')
assert.strictEqual(getCardFileName(`2♣`), '2C.png')
assert.strictEqual(getCardFileName(`2♦`), '2D.png')
assert.strictEqual(getCardFileName(`10♦`), '10D.png')
assert.strictEqual(getCardFileName(`A♦`), 'AD.png')


clearCards(playerHandContainerID);
clearCards(dealerHandContainerID);

addCard(playerHandContainerID, '5♠');
addCard(playerHandContainerID, '9♠');
