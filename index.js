const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reminder = require('./models/reminder')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

const generateId = () => {
    const rngId = Math.floor(Math.random() * 1001010);
    return rngId;
}
const formatReminder = (reminder) => {
  return {
    name: reminder.name,
    timestamp: reminder.timestamp,
    id: reminder._id
  }
}

let Reminders = [
    {
            "name":"Buy some eggs",
            "timestamp":"2021-11-10T13:00:00.141Z",
            "id":1
        },
        {
            "name":"Make an omelette",
            "timestamp":"2021-11-11T08:00:00.141Z",
            "id":2
        },
        {
            "name":"Wash dishes",
            "timestamp":"2021-11-11T09:00:00.000Z",
            "id":3

        },
        {
            "name":"Buy more eggs",
            "timestamp":"2021-11-11-11T13:00:00.000Z",
            "id":4
        }
        ]
let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ]
app.get('/notes', (req, res) => {
    res.json(notes)
  })
app.delete('/api/reminders/:id', (request, response) => {
    console.log(`deleted ${request.params.id}`)
    Reminder.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        response.status(400).send({ error: 'bad id' })
      })
  })
  
app.post('/api/reminders', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.timestamp === undefined) {
        return response.status(400).json({error: 'timestamp missing'})
      }
  
    const reminder = new Reminder ({
      name: body.content,
      timestamp: body.timestamp,
      //id: generateId()
    })
  
    reminder
          .save()
          .then(savedReminder => {
           response.json(formatReminder(savedReminder))
    })
  }) 
  app.get('/api/reminders', (req, res) => {
    Reminder
      .find({})
      .then(reminders => {
         res.json(reminders.map(formatReminder))
    })
  })
  app.get('/api/reminders/:id', (request, response) => {
    const id = request.params.id
    Reminder.findById(id)
      .then(result => {
        response.json(formatReminder(result))
      })
      .catch(error => {
        console.log(error)
      })
  })
  

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

