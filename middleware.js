import jsonServer from 'json-server'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();

const server = jsonServer.create()
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
const middlewares = jsonServer.defaults()
server.use(middlewares)

const router = jsonServer.router('db.json')

const SECRET_KEY = process.env.VITE_SECRET_KEY
const expiresIn = '1h'

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function isAuthenticated({ email, password }) {
    return userdb.users.find(user => user.email === email && user.password === password)
}

server.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = isAuthenticated({ email, password })
    if (!user) {
        const status = 401
        const message = 'Email atau Password salah'
        res.status(status).json({ status, message })
        return
    }
    const { id, role, name } = user
    const token = createToken({ id, role, name })
    res.status(200).json({ token })
})

server.use(router)
const PORT = process.env.VITE_PORT_DB
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`)
})