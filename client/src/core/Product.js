import React, { useState, useEffect } from 'react';
// import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Menu from './Menu';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <div
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container"
        >
            <Menu />

            <div className="mb-3 text-center"><h1>{product && product.name}</h1></div>
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-md-6 col-sm-12">
                    <h4 className='text-center mb-3'>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Product;