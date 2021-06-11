import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCT = [
  { id: 'p1', price: 6, title: 'Book', description: 'desc' },
  { id: 'p2', price: 7, title: 'Book2', description: 'desc2' },
]

const Products = (props) => {

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => <ProductItem
          key = {product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
