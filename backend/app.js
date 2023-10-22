const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./db/connection');
const port = process.env.PORT || 8001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// College routes
const collegeRoutes = require('./routes/college.routes');
app.use('/college', collegeRoutes);

// Student routes
const studentRoutes = require('./routes/student.routes');
app.use('/student', studentRoutes);

// Course routes
const courseRoutes = require('./routes/course.routes');
app.use('/course', courseRoutes);


//Server connection
app.listen(port, () => {
    console.log(`Server Running on PORT ${port} `);
})