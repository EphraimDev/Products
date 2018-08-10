import moment from 'moment';
import uuidv4 from 'uuid/v4';
import products from '../model/products';

/**
 * @exports
 * @class ProductsController
 */
class ProductsController {
  /**
     * Welcome page
     * @staticmethod
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static welcome(req, res) {
    return res.status(200).json('Welcome to Products\' app');
  }

  /**
     * Creates a new product
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static createNewProduct(req, res) {
    const {
      name, description, price, category, image,
    } = req.body;

    // check if product exists
    const findProduct = products.find(product => product.name === name);

    if (findProduct) {
      return res.status(409).json({
        message: `${name} has been created already`,
        success: false,
      });
    }

    const newProduct = {
      productId: uuidv4(),
      name,
      description,
      price: `N${price}`,
      category,
      image,
      created_at: moment().format(),
    };

    // adds the new product to the database
    products.push(newProduct);

    return res.status(201).json({
      message: `${name} has been added successfully`,
      success: true,
      newProduct,
    });
  }

  /**
     * Return product details that matches product id
     *
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static getAProduct(req, res) {
    const { productId } = req.params;

    // find product with params productId
    const findProduct = products.find(product => product.productId === productId);

    // if product does not exist...
    if (!findProduct) {
      return res.status(404).json({
        message: 'Product searched for does not exist',
        success: false,
      });
    }

    // if product exists...
    return res.status(200).json({
      message: 'Product searched for exists',
      success: true,
      findProduct,
    });
  }

  /**
     * Get all products
     *
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static getAllProducts(_req, res) {
    // If the database has no products...
    if (products.length === 0) {
      return res.status(404).json({
        message: 'No product has been added yet',
        success: false,
      });
    }

    // Return all products and their properties
    return res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      products,
    });
  }

  /**
     * Return products in same category
     *
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static getProductsByCategory(req, res) {
    const { category } = req.params;

    // Loop through the products database and return products of same category
    const productsCategory = [];
    products.forEach((product) => {
      if (product.category === category) productsCategory.push(product.name);
    });

    if (productsCategory.length === 0) {
      return res.status(404).json({
        message: `category ${category} does not exist`,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      productsCategory,
    });
  }
}

export default ProductsController;
