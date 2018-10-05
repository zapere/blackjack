const assert = require('assert')

function makeDeck() {
	const deck = [];
	const suits = ['♠', '♥', '♦', '♣'];
	const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	const faces = ['J', 'Q', 'K', 'A'];
	const ranks = numbers.concat(faces);

	suits.forEach(function (suit) {
		ranks.forEach(function (rank) {
			deck.push(`${rank}${suit}`)
		})
	})

	return deck
}

function dealFromBottom(deck, numCards) {
	const hand = []
	for (let i = 0; i < numCards; i++) {
		const poppedCard = deck.pop()
		hand.push(poppedCard)
	}
	return hand
}
const deck = makeDeck()
const hand = dealFromBottom(deck, 2);
assert.deepEqual(hand, ['A♣', 'K♣'])
assert.equal(deck.length, 50)

function dealFromTop(deck, numCards) {
	const hand = []
	for (let i = 0; i < numCards; i++) {
		const shiftedCard = deck.shift()
		hand.push(shiftedCard)
	}
	return hand
}
function hasAtLeastCards(deck, hand) {
	return deck.length >= hand
}
const handFromTop = dealFromTop(deck, 2);
assert.deepEqual(handFromTop, ['2♠', '3♠'])
assert.equal(deck.length, 48)

module.exports = {
	makeDeck,
	dealFromBottom,
	dealFromTop,
	hasAtLeastCards
}