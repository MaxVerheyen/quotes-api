// import the NPM dependancy package
const express     = require("express");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const cors        = require('cors');

const dotenv        = require('dotenv');
dotenv.config();

// initialise express() inside of your app variable
const app = express();

// set the template engine ejs
app.set('view engine', 'ejs');

// parse body of incoming json requests
app.use(bodyParser.json());
// enable public folder
app.use(express.static('public'));
// enable requests from third parties
app.use(cors());

// import route- and model modules and pass your app
// require("./models/Quote")(app);
require("./routes/quoteRoutes")(app);

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true });

// choose what port on which to run the server
const PORT = process.env.PORT || 5000;

// use the app variable and listen on the port
app.listen(PORT, () => {
  console.log(`Server running`);
});