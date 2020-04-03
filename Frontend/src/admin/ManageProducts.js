
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container"
        >
            <div className="row justify-content-center">
                <div className="col-7">
                    <h2 className="text-center">
                        Total: {products.length} products
                    </h2>
                    <hr />
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {products.map((p, i) => (
                                <li
                                    key={i}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <strong className="flex-grow-1">{p.name}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge badge-warning mr-2">Update</span>
                                    </Link>
                                    <span
                                        onClick={() => destroy(p._id)}
                                        className="badge badge-danger" >
                                        Delete
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;