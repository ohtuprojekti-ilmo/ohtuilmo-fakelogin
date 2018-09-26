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
        last_names: "tester"
    },
    {
        username: "username2",
        password: "password2",
        student_number: "456",
        first_names: "test2",
        last_names: "tester2"
    }
]

function authenticate(username, password) {
    const index = users.findIndex((user) => user.username === username)
    if (index > -1) {
        return users[index]
    }
    return false
}

app.post('/api/login', (req, res) => {
    console.log(req.headers)
    console.log(req.body.username)
    console.log(req.body.password)
    const user = authenticate(req.body.username, req.body.password)
    if (user) {
        console.log("asdf")
        res.status(200).json(
            {
                student_number: user.student_number,
                first_names: user.first_names,
                last_names: user.last_names
            }
        )
    } else {
        res.status(400).json({ error: "incorrect login" })
    }
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = {
    app
}