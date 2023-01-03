import productDao from '../daos/mongodb/product.dao';

class ProductService {
  #productDao = productDao;

  async getAll(
    category: string,
  ): Promise<{ products: IProduct[]; info: { [key: string]: number } }> {
    const categories: { [key: string]: string } = {
      artefactos: 'artefacto',
      pergaminos: 'pergamino',
      pociones: 'poción',
      instrumentos: 'instrumento',
    };
    const c: { [key: string]: number } = {
      artefactos: 0,
      pergaminos: 0,
      pociones: 0,
      instrumentos: 0,
    };
    const products = await this.#productDao.getAll(categories[category]);
    products.forEach((product: IProduct) => {
      const category: { [key: string]: string } = {
        artefacto: 'artefactos',
        pergamino: 'pergaminos',
        poción: 'pociones',
        instrumento: 'instrumentos',
      };

      c[category[product.category]] += 1;
    });
    return { products, info: c };
  }
  async getById(id: string): Promise<IProduct> {
    return await this.#productDao.getById(id);
  }
  async updateById(id: string, product: IProduct): Promise<IProduct> {
    try {
      return await this.#productDao.updateById(id, product);
    } catch (err) {
      throw err;
    }
  }
  async deleteById(id: string): Promise<IProduct> {
    try {
      return await this.#productDao.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
  async create(product: IProduct): Promise<IProduct> {
    try {
      return await this.#productDao.create(product);
    } catch (err) {
      throw err;
    }
  }
}

const productService = new ProductService();

export default productService;
