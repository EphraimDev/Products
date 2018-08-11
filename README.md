# Products

[![Build Status](https://travis-ci.org/EphraimDev/Products.svg?branch=develop)](https://travis-ci.org/EphraimDev/Products)
[![Coverage Status](https://coveralls.io/repos/github/EphraimDev/Products/badge.svg?branch=develop)](https://coveralls.io/github/EphraimDev/Products?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4ab38ab780ad6587807f/test_coverage)](https://codeclimate.com/github/EphraimDev/Products/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/4ab38ab780ad6587807f/maintainability)](https://codeclimate.com/github/EphraimDev/Products/maintainability)

### Tech stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)

### Features

- Users can create add new products.
- Users can view all products.
- Users can view the details of a product.
- Users can select products by category.

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

```
git clone https://github.com/EphraimDev/Products.git
```

And install the required dependencies

```
npm install
```

Run server

```
npm start
```

Products app starts at port 6000

## Running the tests

To run test cases

```
npm test
```

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET products</td>
<td>Fetch all products</td>
</tr>
<tr>
<td>GET products/:productId</td>
<td>Fetch a single product</td>
</tr>
<tr>
<td>GET products/categories/:category</td>
<td>Fetch a products belonging to same category</td>
</tr>
<tr>
<td>POST products/create</td>
<td>Add a new product to the database</td>
</tr>
</tbody></table>

## License

This projects is under the MIT LICENSE

## Author 

[Ephraim Aigbefo](https://github.com/EphraimDev)