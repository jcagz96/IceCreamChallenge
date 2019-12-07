const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

const routes = require("./routes");

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

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log(`Server is running...`);
});