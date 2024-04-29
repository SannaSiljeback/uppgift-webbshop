import { IProduct } from "../models/IProduct";

interface IShowProductsProps {
  products: IProduct[];
  addToCart: (product: IProduct) => void;
}

export const ShowProducts: React.FC<IShowProductsProps> = ({
  products,
  addToCart,
}) => {
  return (
    <>
      <ul className="ulContainer">
        {products.map((product) => (
          <li key={product._id}>
            <div className="productContainer">
              <div className="imgContainer">
                <img
                  src={product.image}
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
              <div className="priceContainer">
                {product.name} - {product.price} SEK
                <button onClick={() => addToCart(product)} className="button">
                  Buy fun duck
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
