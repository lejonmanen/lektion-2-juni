const express = require('express')
const { randomUUID } = require('crypto')
const { genSaltSync, hashSync } = require('bcryptjs')

const app = express()
const port = 1234

// Skapa en hemlighet - ett "salt", som används för att göra Hash-funktionen säkrare
// Obs! Spara värdet i en .env-fil i en riktig app
// Environment-variabler används genom process.env.VARIABELNAMN
const salt = '$2a$10$4suQXYUcPxO9Wqe536imEu' //genSaltSync()
console.log('Servern har skapat ett salt: ', salt);


app.use(express.json())
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	next()
})

app.post('/login', (req, res) => {
	// Body: { username, password }
	// TODO: validera body

	// Hasha lösenordet
	// Jämför med existerande användare - se om hashade lösenordet matchar
	// console.log('Före hashing')
	let hash = hashSync(req.body.password, salt)
	// console.log(`Hashing: password="${req.body.password}", hash="${hash}"`)
	// NeDB eller MongoDB: använd findOne
	let found = users.find(user => user.username === req.body.username && user.hashedPassword === hash)
	if( found ) {
		res.sendStatus(200)
	} else {
		res.sendStatus(401)
	}
})

app.post('/signup', (req, res) => {
	// Body: { username, password }
	// TODO: validering:
	// - ogiltig body
	// - username finns redan
	// - password är för enkelt

	let hash = hashSync(req.body.password, salt)
	let newUser = {
		username: req.body.username,
		hashedPassword: hash
	}
	users.push(newUser)
	console.log('Users:', users)
	res.sendStatus(200)
})

const users = []


app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
})
