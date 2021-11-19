const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'c5385308c4de42ee80d16dce6d0599ad',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/api/robots', (req, res) => {
    try {
        rollbar.info("Bots loaded successfully")
        res.status(200).send(botsArr)
    } catch (error) {
        rollbar.error("Error getting bots on page")
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    rollbar.info("HTML file served successfully");
});

app.use("/js", express.static(path.join(__dirname, "/public/index.js")));

app.use("/styles", express.static(path.join(__dirname, "/public/index.css")));

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.info("Robots shuffled successfully")
        res.status(200).send({choices, compDuo})
    } catch (error) {
        rollbar.error("Error getting five bots");
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            rollbar.info("Player lost game")
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            rollbar.info("Player won game")
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.error("Error dueling")
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        rollbar.error('Error getting player stats')
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})