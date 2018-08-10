import express from 'express';
import products from '../controller/products';
import validation from '../middleware/validator';

const router = express.Router();

router.get('/', products.welcome);
router.get('/products', products.getAllProducts);
router.get('/products/:productId', products.getAProduct);
router.get('/products/categories/:category', products.getProductsByCategory);
router.post('/products/create', validation.validateCreateProduct, products.createNewProduct);

export default router;
