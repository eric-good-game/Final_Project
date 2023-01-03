import Product from '../../models/product.model';

class ProductDao {
  async create(product: IProduct): Promise<IProduct> {
    try {
      return await Product.create(product);
    } catch (err) {
      throw err;
    }
  }

  async getAll(category: string): Promise<IProduct[]> {
    try {
      const options = category ? { category } : {};
      return await Product.find(options).lean();
    } catch (err) {
      throw err;
    }
  }
  async getById(id: string): Promise<IProduct> {
    try {
      return await Product.findById(id).lean();
    } catch (err) {
      throw err;
    }
  }
  async updateById(id: string, product: IProduct): Promise<IProduct> {
    try {
      return await Product.findByIdAndUpdate(id, product, { new: true }).lean();
    } catch (err) {
      throw err;
    }
  }
  async deleteById(id: string): Promise<IProduct> {
    try {
      return await Product.findByIdAndDelete(id).lean();
    } catch (err) {
      throw err;
    }
  }
}

const productDao = new ProductDao();

export default productDao;
