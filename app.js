require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db.js');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');
let calc = require('./controllers/calculatorcontroller');

sequelize.sync();

app.use(express.json());
app.use('/user', user);
app.use('/journal', journal); 
app.use('/calculator', calc);



app.listen(3000, function() {
    console.log("App is listening on port 3000");
});

