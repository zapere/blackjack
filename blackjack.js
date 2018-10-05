const assert = require('assert')
const makeDeck = require('./deck').makeDeck
const shuffle = require('./shuffle')
const dealFromTop = require('./deck').dealFromTop
const getHandValue = require('./blackjack-deck').getHandValue
const whoWon = require('./blackjack-deck').whoWon
const askToHit = require('./prompt-user').askToHit
const formatHand = require('./blackjack-deck').formatHand
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

function printCurrentHand(playerHand, dealerHand, dealerCardsToHide) {
  const tabStop = formatHand(playerHand, 0).length + 5
  console.log("\tPlayer".padEnd(tabStop) + "Dealer")
  console.log(`\t${formatHand(playerHand, 0)}`.padEnd(tabStop) + `${formatHand(dealerHand, dealerCardsToHide)}`)
}

async function run() {
  const deck = makeDeck()
  shuffle(deck)
  const playerHand = dealFromTop(deck, 2)
  const dealerHand = dealFromTop(deck, 2)

  while (true) {
    printCurrentHand(playerHand, dealerHand, 1)
    const shouldHit = await askToHit()
    if (shouldHit === true) {
      console.log('Player has hit')
      const card = dealFromTop(deck, 1)[0]
      console.log(card)
      playerHand.push(card)
    } else {
      console.log('Player stands')
      break;
    }
  }

  printCurrentHand(playerHand, dealerHand, 0)
  const winner = whoWon(playerHand, dealerHand)
  console.log(`${winner} wins!`)

}

run()
