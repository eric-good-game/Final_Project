import { Request, Response } from 'express';
import productService from '../services/product.service';
import logger from '../utils/logger';

class ProductController {
  #productService = productService;
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }
  async getAll(req: Request, res: Response) {
    try {
      const category = req.query.category || '';

      const { products, info } = await this.#productService.getAll(
        category as string,
      );

      res.status(200).json({ products, info });
    } catch (err) {
      logger.error(err);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const product = await this.#productService.create(req.body);
      if (!product) {
        logger.warn('Product not created');
        return res.status(404).json({ message: 'Product not created' });
      }
      res.status(200).json({ product });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await this.#productService.getById(req.params.id);
      if (!product) {
        logger.warn('Product not found');
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async updateById(req: Request, res: Response) {
    try {
      const product = await this.#productService.updateById(
        req.params.id,
        req.body,
      );
      if (!product) {
        logger.warn('Product not found');
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ product });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const product = await this.#productService.deleteById(req.params.id);
      if (!product) {
        logger.warn('Product not found');
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

const productController = new ProductController();

export default productController;
