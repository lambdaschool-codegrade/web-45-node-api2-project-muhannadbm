// implement your server here
// require your posts router and connect it here
const express = require('express')
const posts_router = require('../api/posts/posts-router')
const server = express()
server.use(express.json())

server.use('/api/posts', posts_router)


module.exports = server