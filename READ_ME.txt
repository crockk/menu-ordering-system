This web application requires the following script to be
run in Mongo inside a database named retailerDB.


db.products.insert(
    [
        { _id:1, productName:'Cake Mix', price:2.99 },
        { _id:2, productName:'Cookie Dough', price:1.25 },
        { _id:3, productName:'Orange Juice', price:4.25},
        { _id:4, productName:'Cookie Dough', price:1.45 },
        { _id:5, productName:'Carrots', price:1.01 },
    ]
)

After running the script, run 'npm install' in both project directories.

To build the application, run ex_fullCrud_MVC/app.js in an IDE, and then navigate to
the angularClient directory in a terminal window and run 'ng serve'

The local web page is hosted on: localhost:4200