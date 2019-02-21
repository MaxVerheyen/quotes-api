let Quote = require('../models/Quote')

module.exports = app => {
    app.get('/',function(req, res){
        res.render("index");
    });

    app.post("/quote/create", (req, res) => {
        let instance = new Quote({
            quote: req.body.quote,
            author: req.body.author
        });

        instance.save(function (err) {
            if (err) return handleError(err);
            res.sendStatus(200);
        });
    });

    app.delete("/quote/delete", (req, res) => {
        Quote.findOneAndDelete({ _id: req.body.id }, function(err) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

    app.put("/quote/update", (req, res) => {
        Quote.findOneAndUpdate({ _id: req.body.id }, { quote: req.body.quote ,author: req.body.author }, function(err, Quote) {
            if (err) throw err;
            console.log(Quote);
            res.sendStatus(200);
        });
    });

    app.get("/quote/read", (req, res) => {
        Quote.find({ _id: req.query.id }, function(err, Quote) {
            if (err) throw err;
            console.log(Quote);
            res.send(Quote);
        });
    });

    app.get("/quotes", (req, res) => {
        Quote.find({}, function(err, Quotes) {
            if (err) throw err;
            //console.log(Quotes);
            res.send(Quotes);
        });
    });
};