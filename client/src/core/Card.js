import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize

}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button id='bt' className="btn btn-outline-success mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} id='bt' className="btn btn-outline-secondary mt-2 mb-2">Add to cart</button>
      )
    );
  };



  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
        <span className="badge badge-primary badge-pill">Out of Stock </span>
      );
  };

  const handleChange = productId => e => {
    setRun(!run); // run useEffect in parent Cart
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (

    <div id='bt' className="border">
      <div id='c' className="h1 text-center bg-white">{product.name}</div>
      <div className="text-center">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
      </div>
      <div className=' bg-light '>

        <div className='  ml-5'>
          <p className=" lead text-center  mt-2">{product.description.substring(0, 100)} </p>

          {showStock(product.quantity)} <br />
          <small className=" m-auto">Price: {' '}<span className='badge badge-pill badge-success p-1'>${' '}{product.price}</span> </small><br />
          <small className=" m-auto">Category: {product.category && product.category.name}</small><br />
          <small className=" m-auto">Added on {moment(product.createdAt).fromNow()}</small><br />
         <div className='mb-3'>

          {showViewButton(showViewProductButton)}
          {showAddToCart(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
         </div>
        </div>
      </div>

    </div>

  );
};

export default Card;