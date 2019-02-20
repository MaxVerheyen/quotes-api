let mongoose = require('mongoose')
let Quote = new mongoose.Schema({
  quote: {type:String, default:"Unknown Quote"},
  author: {type:String, default:"Unknown Author"}
})
module.exports = mongoose.model('Quote', Quote)