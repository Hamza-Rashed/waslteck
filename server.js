require("dotenv").config()
require('express-async-errors')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHundler = require("./middleware/errorHundler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(logger)

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, "Files")))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/company_info', require('./routes/companyInfoController'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHundler)

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})