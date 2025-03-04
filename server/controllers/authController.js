let users = require('../models/users')

let id = 1

module.exports = {
    register: (req, res) => {
        let { session } = req
        let { username, password } = req.body

        users.push({id, username, password})
        id++

        session.user.username = username

        res.status(200).send(session.user)
    },
    login: (req, res) => {
        let { session } = req
        let { username, password } = req.body

        let user = users.find(user => user.username === username && user.password === password)

        if (user) {
            session.user.username = user.username
            res.status(200).send(session.user)
        } else {
            res.status(500).send('invalid')
        }
    },
    signout: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res) => {
        const { session } = req
        res.status(200).send(session.user)
    }
}