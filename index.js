require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const sensorRoutes = require('./routes/sensorRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
connectDB();

app.get('/', (req, res)=> {
  res.send("Api Konveyor Ready")
})
app.use('/api', sensorRoutes);
app.use('/user', userRoutes);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
