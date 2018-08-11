/**
 * @exports
 * @class BodyRequest
 */
class BodyRequest {
    /**
          * Return body request
          *
          * @staticmethod
          * @param  {object} req - Request object
          * @param {object} res - Response object
          * @param {function} next - middleware next (for error handling)
          * @return {json} res.json
          */
    static bodyRequest(req, res) {
        const {name, description, price, category, image} = req.body;
        return {name, description, price, category, image}
    }
  }
  
  export default BodyRequest;
