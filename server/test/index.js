import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import UUIDV4 from 'uuid/v4';
import products from '../model/products';
// import chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised)

import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('Tests for Products\' API endpoints', () => {
  describe('GET /', () => {
    it('should display a welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          res.body.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Handles valid endpoints for products', () => {
    describe('POST /products/create', () => {
      it('should add a product', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          description: 'Shoes for kids',
          price: 2000,
          category: 'Footware',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Fancy shoe has been added successfully');
            res.body.should.have.property('newProduct');
            res.body.should.have.property('success').eql(true);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET products/:productId', () => {
      it('should return a product', (done) => {
        chai.request(app)
          .get('/products/c3c4a0d6-3dba-4cec-8752-c546b4d7517c')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product searched for exists');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('findProduct');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET products', () => {
      it('should get all products', (done) => {
        chai.request(app)
          .get('/products')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Products retrieved successfully');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('products');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET /products/categories/:category', () => {
      it('should return all products under selected category', (done) => {
        chai.request(app)
          .get('/products/categories/Footware')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Products retrieved successfully');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('productsCategory');
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('Handles invalid endpoints for products', () => {
    describe('POST products/create', () => {
      it('should return an error message for product name', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          description: 'Shoes for kids',
          price: 2000,
          category: 'Footware',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product name can only contain letters and the characters (,.\'-)');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message for product description', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          price: 2000,
          category: 'Footware',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product description can only contain letters, numbers and the characters (,.\'-)');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message for product price', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          description: 'Shoes for kids',
          category: 'Footware',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product price must be a number');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message for product category', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          description: 'Shoes for kids',
          price: 2000,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product category can only contain letters, numbers and the characters (,.\'-)');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message to add valid image url', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          description: 'Shoes for kids',
          price: 2000,
          category: 'Footware',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Add a valid image url');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message for already existing products', (done) => {
        const newProduct = {
          productId: UUIDV4(),
          name: 'Fancy shoe',
          description: 'Shoes for kids',
          price: 2000,
          category: 'Footware',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          created_at: moment().format(),
        };
        chai.request(app)
          .post('/products/create')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Fancy shoe has been created already');
            res.body.should.have.property('success').eql(false);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET products/:productId', () => {
      it('should return an error message for a product that does not exist', (done) => {
        chai.request(app)
          .get('/products/2e00ucef-d3af-9d13-6b85-e9b30a043e28')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Product searched for does not exist');
            res.body.should.have.property('success').eql(false);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET products/categories/:category', () => {
      it('should return an error message for category that does not exist', (done) => {
        chai.request(app)
          .get('/products/categories/Apparel')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('category Apparel does not exist');
            res.body.should.have.property('success').eql(false);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET products/', () => {
      it('should return an error message if database is empty', (done) => {
        products.length = 0;
        chai.request(app)
          .get('/products')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('No product has been added yet');
            res.body.should.have.property('success').eql(false);
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
