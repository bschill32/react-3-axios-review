const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mc = require('./controllers/movieController')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/api/movies', mc.getMovies)
app.post('/api/movies', mc.addMovie)
app.delete('/api/movies/:id', mc.deleteMovie)
app.put('/api/movies/:id', mc.editMovie)

app.listen(3005, () => {
    console.log('Listening on 3005')
})