const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const routes = require("./routes");

//const mongoString = "mongodb+srv://garcez:teste1234@blogapp-prod-rvcpo.mongodb.net/IceCream?retryWrites=true&w=majority"

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    () => {
        console.log(`Database connected `);
    }
);

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log(`Server is running...`);
});