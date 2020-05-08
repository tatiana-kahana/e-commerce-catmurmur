import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import CardOfCart from './CardOfCart';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart())
    }, [run]);

    const showItems = items => {
        return (
            <div className="row">
                <div className="col">
                    <h2>Your cart has {`${items.length}`} items</h2>
                    <hr />
                    <div className="list-group">
                        {items.map((product, i) => (
                            <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <CardOfCart
                                    product={product}
                                    showAddToCartButton={false}
                                    cartUpdate={true}
                                    showRemoveProductButton={true}
                                    setRun={setRun}
                                    run={run}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>Your cart is empty.<br /><Link to="/shop">Continue shopping</Link></h2>
    )

    return (
        <Layout
            title='Shopping cart'
            description='Manage your cart items. Add, remove, checkout or continue to enjoy your shopping.'
            className="container-fluid cart">
            <div className="row">
                <div className="col-12 col-lg-8">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-12 col-lg-4">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;