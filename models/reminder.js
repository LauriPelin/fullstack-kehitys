const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const url = process.env.MONGODB_URI + "/fullstack-reminders"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const Reminder = mongoose.model('Reminder', {
	name: String,
	timestamp: Date
})


module.exports = Reminder
