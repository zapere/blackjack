// https://raw.githack.com/zapere/blackjack/master/dist/index.html
const assert = require('assert')
const makeDeck = require('./deck').makeDeck
const shuffle = require('./shuffle')
const dealFromTop = require('./deck').dealFromTop
const playerHandContainerID = "playerHandContainer";
const dealerHandContainerID = "dealerHandContainer";
const hitButtonID = "hitButton";
const standButtonID = "standButton";
const winnerMessageID = "winnerMessage";
const getHandValue = require('./blackjack-deck').getHandValue
const isBust = require('./blackjack-deck').isBust
const shouldDealerHit = require('./blackjack-deck').shouldDealerHit
const whoWon = require('./blackjack-deck').whoWon


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

function hitButtonHandler() {
  console.log('Player has hit')
  const card = dealFromTop(deck, 1)[0]
  playerHand.push(card)
  showCurrentHand(playerHand, dealerHand, 1)
  const playerHandValue = getHandValue(playerHand)
  if (playerHandValue > 21) {               // BUSTED
    console.log(`Player has busted at ${playerHandValue}.`)
    dealerTurn()
  }
}

function standButtonHandler() {
  console.log('Player stands');
  dealerTurn();
}

function dealerTurn() {
  console.log("dealerTurn");
  hitButton.disabled = true;
  standButton.disabled = true;
  while (true) {
    showCurrentHand(playerHand, dealerHand, 0)
    const dealerHandValue = getHandValue(dealerHand)
    if (isBust(dealerHand)) {
      console.log(`Dealer has busted at ${dealerHandValue}.`)
      break;
    }
    const shouldHit = shouldDealerHit(dealerHand, playerHand)
    if (shouldHit === true) {
      console.log('Dealer has hit')
      const card = dealFromTop(deck, 1)[0]
      dealerHand.push(card)
    } else {
      console.log('Dealer stands')
      break
    }
  }
  endGame()
}

function endGame() {
  showCurrentHand(playerHand, dealerHand, 0)
  const winner = whoWon(playerHand, dealerHand)
  console.log(`${winner} wins!`);
  showWinnerMessage(`${winner} wins!`)
}

function showWinnerMessage(message) {
  const winnerMessageElement = document.getElementById(winnerMessageID);
  winnerMessageElement.innerText = message; 
}
clearCards(playerHandContainerID);
clearCards(dealerHandContainerID);
showWinnerMessage("")
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
const hitButton = document.getElementById(hitButtonID);
const standButton = document.getElementById(standButtonID);
standButton.addEventListener("click", standButtonHandler)
hitButton.addEventListener("click", hitButtonHandler)


