# Endpoints
    * http://localhost:3000/ - menu page, shows only products with available inventory
    * http://localhost:3000/products - add/edit products and ingredients
    * http://localhost:8080 - api endpoints
## Orders endpoints
* **GET**
  * **/all** - find all orders
  * **/:id** - find an order by ID
* **POST**
  * **/** - add a new order & update the inventory

## Products endpoints
* **GET**
  * **/all** - find all products
* **POST**
  * **/** - add a new product using data from a request body
* **DELETE**
  * **/:name** - delete a product found by name

## Ingredients endpoints
* **GET**
  * **/all** - find all ingredients
* **POST**
  * **/add** - add a new order or edit an existing one using data from a request body
# MongoDB
* Database address:
  * `mongodb://localhost:27017/menu`
* Database name:
  * `menu`
* Collections names:
  * `orders`
  * `products`
  * `ingredients`

# Download and Install
* `npm install`
* `npm run server`
* in an other terminal `npm run start`