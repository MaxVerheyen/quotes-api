let Quote = require('../models/Quote')

module.exports = app => {
    app.get('/',function(req, res){
        res.render("index");
    });

    app.post("/quote/create", (req, res) => {
        // Create an instance of model Quote
        let instance = new Quote({
            quote: req.body.quote,
            author: req.body.author
        });

        // Save the new model instance, passing a callback
        instance.save(function (err) {
            if (err) return handleError(err);
            console.log('Quote successfully saved!');
            res.sendStatus(200);
        });
    });

    app.delete("/quote/delete", (req, res) => {
        // find the Quote by id
        // delete him
        Quote.findOneAndDelete({ _id: req.body.id }, function(err) {
            if (err) throw err;
            console.log('Quote successfully deleted!');
            res.sendStatus(200);
        });
    });

    app.put("/quote/update", (req, res) => {
        // find the Quote by id
        // update him
        Quote.findOneAndUpdate({ _id: req.body.id }, { quote: req.body.quote ,author: req.body.author }, function(err, Quote) {
            if (err) throw err;
            // we have the updated Quote returned to us
            // console.log(Quote);
            console.log('Quote successfully updated!');
            res.sendStatus(200);
        });
    });

    app.get("/quote/read", (req, res) => {
        // get the Quote by id
        Quote.find({ _id: req.query.id }, function(err, Quote) {
            if (err) throw err;
            // we have the object Quote returned to us
            console.log(Quote);
            res.send(Quote);
        });
    });

    app.get("/quotes", (req, res) => {
        // get all the Quotes
        Quote.find({}, function(err, Quotes) {
            if (err) throw err;
            // object of all the Quotes
            // console.log(Quotes);
            res.send(Quotes);
        });
    });
};