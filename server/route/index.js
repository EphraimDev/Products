import express from 'express';
import multer from 'multer';
import products from '../controller/products';
import validation from '../middleware/validator';

const router = express.Router();
const upload = multer();

router.get('/', products.welcome);
router.get('/products', products.getAllProducts);
router.get('/products/:productId', products.getAProduct);
router.get('/products/categories/:category', products.getProductsByCategory);
router.post('/products/create', upload.any(), validation.validateCreateProduct, products.createNewProduct);

export default router;
