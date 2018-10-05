/*
shuffle discussion:
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/

// adapted from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
	let m = array.length;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		const i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		const t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

module.exports = shuffle