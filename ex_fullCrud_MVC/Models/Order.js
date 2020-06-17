var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({

        serverName: { type: String, required: true},
        orderDate:  { type: Date },
        total:      { type: Number}
    },
    {
        versionKey: false,
        collection: 'orders'
    }
);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;