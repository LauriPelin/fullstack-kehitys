const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

const generateId = () => {
    const rngId = Math.floor(Math.random() * 1001010);
    return rngId;
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
    const id = Number(request.params.id)
    Reminders = Reminders.filter(reminder => reminder.id !== id)
  
    response.status(204).end()
  })
app.post('/api/reminders', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.timestamp === undefined) {
        return response.status(400).json({error: 'timestamp missing'})
      }
  
    const reminder = {
      name: body.content,
      timestamp: new Date(),
      id: generateId()
    }
  
    Reminders = Reminders.concat(reminder)
  
    response.json(reminder)
  }) 
app.get('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    const reminder = Reminders.find(reminder => reminder.id === id)
        if ( reminder ) {
          response.json(reminder)
        } else {
          response.status(404).end()
        }
    })

app.get('/api/reminders', (req, res) => {
    res.json(Reminders)
  })
const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

