const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://cluster0.5jlzd.mongodb.net/fullstack-reminders'
const Reminder = mongoose.model('Reminder', {
	name: String,
	timestamp: Date
})

var connectMongoose = () =>{
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
}

if (process.argv.length === 2) {
	connectMongoose()
	Reminder.find({})
		.then(result => {
			console.log('Reminders:')
			result.forEach(reminder => {
				console.log(reminder.name + " " + reminder.timestamp)
			})
		})
		.then(result => {
			mongoose.connection.close()
		})
}

else if (process.argv.length === 4) {
	connectMongoose()
	const reminder = new Reminder({
		name: process.argv[2],
		timestamp: process.argv[3]
	})

	console.log('add reminder ' + reminder.name + ' ' + reminder.timestamp + ' to the database')

	reminder
		.save()
		.then(response => {
			console.log(response)
			mongoose.connection.close()
		})
}
else {
	console.log('whathappened: node mongo.js "reminder" <timestamp>')

}


