const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

require('dotenv').config();

const routes = require("./routes");


const app = express();
const server = http.Server(app);
const io = socketio(server);




//database connection
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    () => {
        console.log(`Database connected `);
    }
);


const connectdUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;
    console.log(" backend -> " + user_id);
    console.log(" backend -> " + socket.id);

    connectdUsers[user_id] = socket.id;
})

app.use((req, res, next) => {
    req.io = io;
    req.connectdUsers = connectdUsers;

    return next();
})


app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
    console.log(`Server is running...`);
});