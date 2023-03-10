const connectToMongo = require('./db');
const express = require('express');
connectToMongo(); //Used for established connections
const app = express();
const port = 3500;
const cors = require('cors');

app.use(cors());
app.use(express.json());
//Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Notebook app backend listening on port http://localhost:${port}`)
})


