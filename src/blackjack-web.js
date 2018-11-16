const assert = require('assert')
const makeDeck = require('./deck').makeDeck
const shuffle = require('./shuffle')
const dealFromTop = require('./deck').dealFromTop
const playerHandContainerID = "playerHandContainer";
const dealerHandContainerID = "dealerHandContainer";

function clearCards(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
}

function showHand(container, hand, cardsToHide) {
  clearCards(container)
  for (let i = 0; i < hand.length; i++) {
    const hideThisCard = i < cardsToHide
    addCard(container, hand[i], hideThisCard)
  }
}

function showCurrentHand(playerHand, dealerHand, dealerCardsToHide) {
  showHand(playerHandContainerID, playerHand, 0)
  showHand(dealerHandContainerID, dealerHand, dealerCardsToHide)
}

function addCard(containerId, card, hidden) {
  const container = document.getElementById(containerId);
  const cardElement = document.createElement("img");
  if (hidden) {
    cardElement.src = `img/cards/red_back.png`;
  } else {
    cardElement.src = `img/cards/${getCardFileName(card)}`;
  }
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

/*

√ make deck 
  |
√ shuffle
  |
√ deal two two-card hands, dealerHand and playerHand
  |
√ show one dealer card to player 
  |	
player play   --- could bust ---> Dealer Win
  |
dealer play   --- could bust ---> Player Win
  |
compare hands to determine winner

*/

const deck = makeDeck()
shuffle(deck)
const playerHand = dealFromTop(deck, 2)
const dealerHand = dealFromTop(deck, 2)
showCurrentHand(playerHand, dealerHand, 1)



