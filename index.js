const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

var users = [
    {
        username: "username",
        password: "password",
        student_number: "123",
        first_names: "test",
        last_name: "tester"
    },
    {
        username: "username2",
        password: "password2",
        student_number: "456",
        first_names: "test2",
        last_name: "tester2"
    }
]

function authenticate(username, password) {
    const index = users.findIndex((user) => user.username === username)
    if (index > -1) {
        const user = users[index]
        if (user.password === password) {
            return user
        }
    }
    return false
}

app.post('/api/login', (req, res) => {
    if (req.body.username && req.body.password) {
        const user = authenticate(req.body.username, req.body.password)
        if (user) {
            res.status(200).json(
                {
                    username: user.username,
                    student_number: user.student_number,
                    first_names: user.first_names,
                    last_name: user.last_name
                }
            )
        } else {
            res.status(200).json({ error: "wrong credentials" })
        }
    } else {
        res.status(500).send()
    }
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = {
    app
}