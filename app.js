const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./src/routes');

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
};

app.use(cors(corsOptions));
app.use(helmet());

app.use('/', router);

app.listen(3000, () => {
  console.log('Server running at port 3000.');
});
