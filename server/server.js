const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./server/config')
const app = express()
const path = require('path')

const signRouter = require('./router/signRouter')
const loginRouter = require('./router/loginRouter')
const todoRouter = require('./router/todoRouter')
const userRouter = require('./router/userRouter')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
config()

app.use('/signup', signRouter)
app.use('/login', loginRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)




app.listen(process.env.PORT, () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(console.log("CONNECT TO DB..."))
        .catch((err) => err)
})