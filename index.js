const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./taskRouter');


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/task/:taskId', taskRouter);
app.get("/", (req, res) => {
    res.send("hello from server");
    console.log("I will be shown on the Terminal");
});

app.listen(3000);
