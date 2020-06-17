var HomeController = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
var OrderController = require('./Controllers/OrderController');
const cors = require('cors');

module.exports = function(app){  
    app.get('/',      HomeController.Index);
    app.get('/Product/Index', cors(), ProductController.Index);
    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.put('/Product/Update', cors(), ProductController.Update);
    app.delete('/Product/Delete', cors(), ProductController.Delete);

    app.post('/Order/CreateOrder', cors(), OrderController.CreateOrder);
    app.get('/Order/Index', cors(), OrderController.Index);


};

