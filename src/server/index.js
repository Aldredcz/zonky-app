/* eslint-disable no-console */
const express = require('express')
const request = require('request')
const path = require('path')
const http = require('http')
const fs = require('fs-extra')
const PROJECT_CONSTANTS = require('../../project.constants')

const app = express()


app.set('port', process.env.SERVER_PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.static(PROJECT_CONSTANTS.PATH_BASE_DIR))

app.route('/favicon.ico')
	.get((req, res) => {
		res.end()
	})

const ZONKY_API_PREFIX = '/zonkyapi'	

app.use(`${ZONKY_API_PREFIX}/`, (req, res) => {
	let url = 'https://api.zonky.cz'
	url += req.originalUrl.substring(ZONKY_API_PREFIX.length)

	console.log('[ZONKY API]', url)

	req.pipe(request(url)).pipe(res)
})
	

const pageRouter = (req, res) => {
	res.render('main', {
		env: process.env.NODE_ENV,
		buildHash: process.env.BUILD_HASH,
		PROJECT_CONSTANTS,
	})
}

app.route('/*').get(pageRouter)

http.createServer(app).listen(app.get('port'), () => {
	console.log(`[EXPRESS] Server listening on port ${app.get('port')}`)
})
