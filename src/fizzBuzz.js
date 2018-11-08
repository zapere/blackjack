const assert = require('assert')
// 10/4/18 Warm up  
// Write a program that prints out all of the values in numbers.
// But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz".
// For numbers which are multiples of both three and five print "FizzBuzz".
const numbers = [11, 6, 7, 16, 20, 5, 8, 15, 1, 10, 14, 18, 19, 12, 2, 9, 3, 4, 13, 17]

const expected = 2
const actual = 5 % 3

assert.deepEqual(actual, expected)

numbers.forEach(function (number) {
	if (number % 3 === 0 && number % 5 === 0) {
		console.log("FizzBuzz")
	}
	else if (number % 3 === 0) {
		console.log("Fizz")
	}
	else if (number % 5 === 0) {
		console.log("Buzz")
	} else {
		console.log(number)
	}
})

for (let i = 0; i < numbers.length; i++) {
	const number = numbers[i]
	if (number % 3 === 0 && number % 5 === 0) {
		console.log("FizzBuzz")
	}
	else if (number % 3 === 0) {
		console.log("Fizz")
	}
	else if (number % 5 === 0) {
		console.log("Buzz")
	} else {
		console.log(number)
	}
}

/*
 carl expects to see:
 11
 fizz
 7
 16
 buzz
 buzz
 8
 fizzbuzz
 1
 fizz
 14
 fizz
 19
 fizz
 2
 fizz
 fizz
 4
 13
 17
*/