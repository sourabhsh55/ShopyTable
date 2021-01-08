# ShopyTable

## Run Locally
    1) Clone repo
        $ git clone https://github.com/sourabhsh55/ShopyTable.git
        $ cd ShopyTable

    2) Setup MongoDB database.
        Download and Install it from mongodb.com

    3) Create .env file in the backend folder
        ** Add following lines to that file.

        JWT_SECRET=secretkey@1
        MONGODB_URL=mongodb://localhost/ShopyTable
    
    4) Run frontend
        $ cd frontend
        $ npm start frontend
    
    5) Run backend
        $ cd backend
        $ node server.js

## API routes
### There are four major routes.
    a) Product route.
    b) Cart route.
    c) Authentication route.
    d) Orders route.

## Features

### 1) Home Screen:-
- navbar containing signup, cart options.
- All available products are tilled up on this page.
- footer section.

### 2) Product Screen:-
- Information about Product is presented on this page.
- user can choose quantity of product.
- Add-to-cart button.

### 3) Cart Screen:-
- User can view all the cart items on this page.
- address and pincode section is there for delievery purpose.

### 4) Profile Screen:-
- shows info about the user.
- Logout and Add-Product button is embedded.
- List of orders with current status.

## Admin:
    - Authority to create/delete new products
    - Watch orders of all the users


#### HTML,CSS => thanks to youtube~videos and stackoverflow.