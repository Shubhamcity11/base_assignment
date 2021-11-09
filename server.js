require('dotenv').config()
const express = require('express'),
      app     = express();
      port    = 3000 || process.env.port,
      morgan = require('morgan'),
      db      = require("./db");
const todoRoutes = require("./routes/todo");

app.use(express.json());
app.use(morgan('tiny'));
app.use(todoRoutes);

app.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 500;
    next(error)
})
//global error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
        message: err.message || "Something went wrong"
    })
})

db.sync().then(() => {
    console.log("Connected to the database")
    app.listen(port, () => {
        console.log('Server started on port: ' + port);
    })
})
