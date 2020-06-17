const OrderRepo   = require('../Data/OrderRepo');
const _orderRepo  = new OrderRepo();
const Order       = require('../Models/Order');


exports.Index = async function(request, response){
    let orders = await _orderRepo.allOrders();
    if(orders != null) {
        response.json({ orders:orders })
    }
    else {
        response.json( { orders:[] })
    }
};

exports.CreateOrder = async function(request, response){
    
    let tempOrderObj = new Order({
        serverName: request.body.serverName,
        orderDate:  request.body.orderDate,
        total:      request.body.total
    });

    let responseObject = await _orderRepo.create(tempOrderObj);

    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ order:responseObject.obj,
                                            errorMessage:""});
    }
    
    else {
        console.log("An error occured. Item not created.");
        response.json( {
                        order:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
}
