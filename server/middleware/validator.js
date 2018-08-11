import BodyRequest from '../helper/bodyRequest';

/**
 * @exports
 * @class ProductValidation
 */
class ProductValidation {
  /**
        * Validate product input
        *
        * @staticmethod
        * @param  {object} req - Request object
        * @param {object} res - Response object
        * @param {function} next - middleware next (for error handling)
        * @return {json} res.json
        */
  static validateCreateProduct(req, res, next) {
    const nameRegex = /^(?=.*[a-z (),.'-]).+$/;
    const descriptionRegex = /^(?=.*[a-zA-Z 0-9 (),.'-]).+$/;
    const digits = /^(?=.*[0-9]).+$/;
    const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;

    const {name, description, price, category, image} = BodyRequest.bodyRequest(req,res);
    console.log(price);
    if (!name || !nameRegex.test(name) || !name.length > 0 || typeof name !== 'string') {
      res.status(400).json({ message: 'Product name can only contain letters and the characters (,.\'-)' });
    } else if (!description || !descriptionRegex.test(description) || !(description.length > 0) || typeof description !== 'string') {
      res.status(400).json({ message: 'Product description can only contain letters, numbers and the characters (,.\'-)' });
    } else if (!price || !digits.test(price) || typeof price !== 'number') {
      res.status(400).json({ message: 'Product price must be a number' });
    } else if (!category || !descriptionRegex.test(category) || !(category.length > 0) || typeof category !== 'string') {
      res.status(400).json({ message: 'Product category can only contain letters, numbers and the characters (,.\'-)' });
    } else if (!image || !imgRegex.test(image) || typeof image !== 'string') {
      res.status(400).send({ message: 'Add a valid image url' });
    } else {
      next();
    }
  }
}

export default ProductValidation;
