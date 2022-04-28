const express = require('express');
const path = require('path');

const app = express()

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../index.html'))
})

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '8df491279a664750a1e3ce9ce979c501',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'John', type: 'manual entry'})

    res.status(200.send(students))
})

const port = process.env.PORT || 4545

app.listen(port, ()=>console.log(`Server is running on port: ${port}`))