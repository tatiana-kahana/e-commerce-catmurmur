import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);


    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data);
                // then fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    };
                });
            };
        });
    };
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            className="container-fluid product">
            <div className="row">
                <div className="col-12 col-lg-8">
                    {
                        product &&
                        product.description &&

                        < Card product={product} showViewProductButton={false} />
                    }
                </div>

                <div className="col-12 col-lg-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    );
};

export default Product;