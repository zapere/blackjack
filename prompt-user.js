const inquirer = require('inquirer')

const askToHit = async () => {
	const answer = await inquirer.prompt({
		type: 'confirm',
		name: 'shouldHit',
		message: 'Would you like to hit?',
		default: false
	});
	return answer.shouldHit
}

module.exports = {
	askToHit
}