import express from 'express'

const app = express()
const port = 1234

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
})
