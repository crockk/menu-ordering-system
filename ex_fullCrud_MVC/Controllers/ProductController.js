const ProductRepo   = require('../Data/ProductRepo');
const _productRepo  = new ProductRepo();
const Product       = require('../Models/Product');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Index = async function(request, response){
    let products = await _productRepo.allProducts();
    if(products!= null) {
        response.json({ products:products })
    }
    else {
        response.json( { products:[] })
    }
};

// GET request calls here to display 'Product' create form.
exports.Create = async function(request, response) {
    response.json( { errorMessage:"", product:{} });
};

// Receives POST data and tries to save it.
exports.CreateProduct = async function(request, response) {

    let responseObject = null;
    let possibleObj = _productRepo.getProduct(request.body._id)

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempProductObj  = new Product( {
        "_id":request.body._id,
        "productName":    request.body.productName,
        "price": request.body.price
    });

    // Try to update, in case there is an existing document with the same ID
    responseObject = await _productRepo.update(tempProductObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ product:responseObject.obj,
                                            errorMessage:""});
    }
    // There are errors. Try to create new document.
    else {
        responseObject = await _productRepo.create(tempProductObj);
        // No errors, save successful
        if(responseObject.errorMessage == "") {
            console.log('Saved without errors.');
            console.log(JSON.stringify(responseObject.obj));
            response.json({ product:responseObject.obj,
                                                errorMessage:""});
        }
        // There were errors, send error messsage 
        else {
            console.log("An error occured. Item not created.");
            response.json( {
                            product:responseObject.obj,
                            errorMessage:responseObject.errorMessage});
        }
    }

};

// Receives posted data that is used to update the item.
exports.Update = async function(request, response) {
    let productID = request.body._id;
    console.log("The posted product id is: " + productID);

    // Parcel up data in a 'Product' object.
    let tempProductObj  = new Product( {
        _id: productID,
        productName:    request.body.productName,
        price: request.body.price
    });

    // Call update() function in repository with the object.
    let responseObject = await _productRepo.update(tempProductObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        response.json({ product:responseObject.obj,
                                            errorMessage:"" });
    }

    // Update not successful. Show edit form again.
    else {
        response.json( {
            product:      responseObject.obj,
            errorMessage: responseObject.errorMessage });
    }
}

exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _productRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let products     = await _productRepo.allProducts();
    response.json( {products:products});
}

