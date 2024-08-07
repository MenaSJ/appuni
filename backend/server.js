require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(express.json());
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use('/universidades', require('./routes/api/universidades'));
app.use('/refresh', require('./routes/refresh'));
app.use('/recover', require('./routes/recover'));
app.use('/logout', require('./routes/logout'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/comentarios', require('./routes/api/comentarios'))
app.use('/favoritos', require('./routes/api/favoritos'));
app.use(verifyJWT);
app.use('/usuarios', require('./routes/usuarios'));
app.use('/carreras', require('./routes/api/carreras'));

app.use(errorHandler);

mongoose.connection.once('open', () => { 
    console.log('Connected to MongDB')
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
})


