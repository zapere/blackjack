const assert = require('assert')
const makeDeck = require('./deck').makeDeck
const shuffle = require('./shuffle')
const dealFromTop = require('./deck').dealFromTop
const getHandValue = require('./blackjack-deck').getHandValue
const whoWon = require('./blackjack-deck').whoWon
const askToHit = require('./prompt-user').askToHit
const formatHand = require('./blackjack-deck').formatHand
const isBust = require('./blackjack-deck').isBust
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

function shouldDealerHit(dealerHand, playerHand) {
  const dealerHandValue = getHandValue(dealerHand)
  const playerHandValue = getHandValue(playerHand)
  if (isBust(dealerHand)) return false
  if (isBust(playerHand)) return false
  if (dealerHandValue >= playerHandValue) return false
  // if (dealerHandValue === playerHandValue) {



  //   /*
  //   draw             w   l
  //   2        19      1 : 13
  //   3        18      2 : 12
  //   4        17      3 : 11
  //   5        16      4 : 10  
  //   6        15      5 : 9
  //   7        14      6 : 8
  //   8        13      7 : 7 ----------
  //   9        12      8 : 6
  //   10       11      9 : 5
  //   10       11      9 : 5
  //   10       11      9 : 5
  //   10       11      9 : 5
  //   11       10      10: 4
  //   */
  // }
  return true
}

assert.strictEqual(shouldDealerHit(['8♠', '8♥'], ['7♠', '10♥']), true, 'dealer less than player should hit')
assert.strictEqual(shouldDealerHit(['8♠', 'K♥'], ['7♠', '10♥']), false, 'dealer greater than player should stand')
assert.strictEqual(shouldDealerHit(['7♠', '10♥'], ['7♠', '10♥']), false, 'dealer equal to player should stand')
assert.strictEqual(shouldDealerHit(['7♠', '10♥', '8♥'], []), false, 'busted dealer should stand')
assert.strictEqual(shouldDealerHit(['7♠', '3♥', '8♥'], ['7♠', '3♥', '8♥', '1♥']), true, 'dealer less than player should hit even over 16')

async function run() {
  const deck = makeDeck()
  shuffle(deck)
  const playerHand = dealFromTop(deck, 2)
  const dealerHand = dealFromTop(deck, 2)

  while (true) {
    printCurrentHand(playerHand, dealerHand, 1)
    const playerHandValue = getHandValue(playerHand)
    if (playerHandValue > 21) {               // BUSTED
      console.log(`Player has busted at ${playerHandValue}.`)
      break;
    }
    const shouldHit = await askToHit()
    if (shouldHit === true) {                 // HIT
      console.log('Player has hit')
      const card = dealFromTop(deck, 1)[0]
      playerHand.push(card)
    } else {                                  // STAND
      console.log('Player stands')
      break;
    }
  }

  // Dealer hits if 16 or less. Stands at 17. 
  while (true) {
    printCurrentHand(playerHand, dealerHand, 0)
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




  // Hard level: Dealer doesn't hit if player is bust. 

  printCurrentHand(playerHand, dealerHand, 0)
  const winner = whoWon(playerHand, dealerHand)
  console.log(`${winner} wins!`)
}

run()
