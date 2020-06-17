# Online Food Ordering System

> This is a web application designed for clerks or store managers
to enter food orders, alter menu items, and view all orders on the system.


# Setup

> Run this script in Mongo, within a MongoDB named `retailerDB` to initialize the required table
```JSON
db.products.insert(
    [
        { _id:1, productName:'Cake Mix', price:2.99 },
        { _id:2, productName:'Cookie Dough', price:1.25 },
        { _id:3, productName:'Orange Juice', price:4.25},
        { _id:4, productName:'Cookie Dough', price:1.45 },
        { _id:5, productName:'Carrots', price:1.01 },
    ]
)
```

> In a command prompt window, navigate to `ex_fullCrud_MVC` and run the following command

```
npm install
```

> In a command prompt window, navigate to `angularClient/myapp` and run the following command

```
npm install
```

> In an IDE of your choice, open the directory `ex_fullCrud_MVC` and run or debug `app.js`

> In a command prompt window, navigate to `angularClient/myapp` and run the following command

```
ng serve
```

> Navigate to `localhost:4200` in your preferred web browser to access the application


