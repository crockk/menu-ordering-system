const Order = require('../Models/Order');

class OrderRepo {

    OrderRepo(){
    }

    async allOrders() {
        let orders = await Order.find().exec();
        return orders;
    }

    async create(order) {
        try {
            var error = await order.validateSync();

            if(error) {
                let response = {
                    obj:          order,
                    errorMessage: error.message };

                return response;
            }

            const result = await order.save()

            let response = {
                obj: result,
                errorMessage: ''
            };
            return response;
        }
        
        catch (err) {
            let response = {
                obj:          order,
                errorMessage: err.message };
    
            return  response;
        }
    }      
}

module.exports = OrderRepo;
