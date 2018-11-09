const assert = require('assert')
// const card = "Robert"
// const chars = card.split('')
// console.log(chars);
// console.log(chars[3])

function getCardValue(card) {
	const rank = card.slice(0, card.length - 1)
	if (rank === "K" || rank === "J" || rank === "Q") {
		return 10
	}
	if (rank === "A") {
		return 11
	}
	return parseInt(rank)
}



assert.strictEqual(getCardValue(`10♥`), 10)
assert.strictEqual(getCardValue(`3♥`), 3)
assert.strictEqual(getCardValue(`K♥`), 10)
assert.strictEqual(getCardValue(`K♠`), 10)
assert.strictEqual(getCardValue(`J♥`), 10)
assert.strictEqual(getCardValue(`Q♥`), 10)
assert.strictEqual(getCardValue(`A♥`), 11)

function howManyAces(hand) {
	let Aces = 0
	for (let i = 0; i < hand.length; i++) {
		const card = hand[i]
		const rank = card.slice(0, card.length - 1)
		if (rank === "A") {
			Aces += 1
		}
	}
	return Aces
}

assert.strictEqual(howManyAces(['A♥', 'Q♥']), 1)
assert.strictEqual(howManyAces(['A♥', 'Q♥', 'A♦']), 2)
assert.strictEqual(howManyAces(['3♥', 'Q♥']), 0)


function getHandValue(hand) {
	let Aces = howManyAces(hand)
	let sum = 0
	for (let i = 0; i < hand.length; i++) {
		sum += getCardValue(hand[i])
	}
	while (Aces > 0 && sum > 21) {
		sum -= 10
		Aces -= 1
	}

	// if (sum > 21) return 0
	return sum
}

assert.strictEqual(getHandValue([]), 0)
assert.strictEqual(getHandValue([`3♥`]), 3)
assert.strictEqual(getHandValue([`4♥`]), 4)
assert.strictEqual(getHandValue([`5♥`]), 5)
assert.strictEqual(getHandValue(['3♥', '9♠']), 12)
assert.strictEqual(getHandValue(['3♥', '9♠', '8♠']), 20)
assert.strictEqual(getHandValue(['3♥', '9♠', '8♠', '2♥']), 22)
assert.strictEqual(getHandValue(['7♥', '8♥', '10♠']), 25)
assert.strictEqual(getHandValue(['J♣', '6♦']), 16)
assert.strictEqual(getHandValue(['A♥', '6♦']), 17)
assert.strictEqual(getHandValue(['A♥', '8♥', '10♠']), 19)
assert.strictEqual(getHandValue(['A♥', '8♥', 'A♠']), 20)
assert.strictEqual(getHandValue(['A♥', '10♥', 'A♠']), 12)
assert.strictEqual(getHandValue(['6♦', '9♠', '10♠', '7♦', '8♥', 'A♠']), 41)

function isBust(hand) {
	return getHandValue(hand) > 21
}

assert.strictEqual(isBust(['3♥', '9♠']), false)
assert.strictEqual(isBust(['7♥', '8♥', '10♠', '8♠']), true)

function whoWon(playerHand, dealerHand) {
	const playerHandValue = getHandValue(playerHand)
	const dealerHandValue = getHandValue(dealerHand)

	if (isBust(playerHand) && isBust(dealerHand)) {
		return 'nobody'
	}

	if (isBust(playerHand)) {
		return 'dealer'
	}

	if (isBust(dealerHand)) {
		return 'player'
	}

	if (playerHandValue > dealerHandValue) {
		return 'player'
	}

	if (dealerHandValue > playerHandValue) {
		return 'dealer'
	}

	return 'nobody'

}

assert.strictEqual(whoWon(['3♥', '9♠'], ['8♠', '2♥']), 'player')
assert.strictEqual(whoWon(['8♠', '2♥'], ['3♥', '9♠']), 'dealer')
assert.strictEqual(whoWon(['8♠', '2♥'], ['3♥', '7♠']), 'nobody')
assert.strictEqual(whoWon(['7♥', '8♥', '10♠'], ['J♣', '6♦']), 'dealer')
assert.strictEqual(whoWon(['J♣', '6♦'], ['7♥', '8♥', '10♠']), 'player')
assert.strictEqual(whoWon(['7♥', '8♥', '10♠'], ['7♥', '8♥', '10♠']), 'nobody')
assert.strictEqual(whoWon(['6♦', '9♠', '10♠', '7♦', '8♥', 'A♠'], ['A♥', '5♥']), 'dealer')



function formattedCard(card, hidden) {
	if (hidden) return 'xx'
	else return card
}


function formatHand(hand, numberToHide) {
	let result = ''
	for (let i = 0; i < hand.length; i++) {
		const hidden = i < numberToHide
		result += formattedCard(hand[i], hidden)
		result += ' '		
	}
	return result.trim()
}

assert.strictEqual(formatHand(['8♠', '2♥'], 0),       '8♠ 2♥')
assert.strictEqual(formatHand(['8♠', '3♥', '3♥'], 3), 'xx xx xx')
assert.strictEqual(formatHand(['8♠', '2♥'], 1),       'xx 2♥')
assert.strictEqual(formatHand(['8♠', '3♥', '3♥'], 2), 'xx xx 3♥')
assert.strictEqual(formatHand(['8♠', '3♥', '3♥'], 4), 'xx xx xx')


// assert.strictEqual(formatHand(['8♠', '2♥', '3♥'], 0), '8♠ 2♥ 3♥')

module.exports = {
	getCardValue,
	getHandValue,
	whoWon,
	formatHand,
	isBust
}