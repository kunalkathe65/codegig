const express = require('express');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/db.js');
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));

//Handlebars Configuration
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Starting DB connection
db.authenticate()
  .then(() => console.log('DB CONNECTED...'))
  .catch((err) => console.log('ERROR: ' + err));

//Gig routes
app.use('/gigs', require('./routes/gig'));

//Home Route
app.get('/', (req, res) => {
  res.render('index', { layout: 'landing' });
});

//Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
