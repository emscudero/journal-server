require("dotenv").config;
let express = require('express');
let app = express();
let sequelize = require('./db.js');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

let calc = require('./controllers/calculatorcontroller');

sequelize.sync();

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/journal', journal); 
app.use('/user', user);
app.use('/calculator', calc);



app.listen(3001, function() {
    console.log("App is listening on port 3001");
});

