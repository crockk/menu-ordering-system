var mongoose         = require('mongoose');

var productSchema    = mongoose.Schema({
        _id:            {"type" : Number, min:0, max:1000000, required: true},
        productName:    {"type" : "String", required: true},
        price:          {type: Number}
    }, 
    {   
        versionKey: false,
        collection: 'foodItems'
    });
var Product    = mongoose.model('Product', productSchema);
module.exports = Product;
