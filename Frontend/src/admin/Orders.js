import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);


    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            };
        });
    };

    const loadStatausValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            };
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatausValues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showOrdersLength = (orders) => {
        if (orders.length > 0) {
            return (
                <h1 className='text-danger display-5'>Total orders: {orders.length}</h1>
            )
        } else {
            return <h1 className="text-danger">No orders</h1>
        };
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="inmut-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>

    );
    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if (data.error) {
                console.log("status update faled")
            } else {
                loadOrders();
            };
        });
    };
    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4"> Status:{o.status}</h3>
            <select
                className="form-control"
                onChange={(e) => { handleStatusChange(e, o._id) }}>

                <option>Update Status</option>

                {statusValues.map((status, index) => (<option key={index} value={status}>{status}</option>))}
            </select>
        </div>
    );

    return (
        <Layout className="container-fluid" title="Orders" description={`Hello ${user.name},manage your orders here`}>
            <div className="row">
                <div className='col-12 col-md-8 offset-md-2'>
                    {showOrdersLength(orders)}
                    {orders.map((o, oi) => {
                        return (<div className="mt-5" key={oi} style={{ borderBottom: "5px solid blue" }}>
                            <p className="lead mb-3">
                                Order ID:{o._id}
                            </p>
                            <ul className="list-group mb-2">

                                <li className="list-group-item">
                                    {showStatus(o)}
                                </li>

                                <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                </li>

                                <li className="list-group-item">
                                    Amount: ${o.amount}
                                </li>

                                <li className="list-group-item">
                                    Ordered by:{o.user.name}
                                </li>

                                <li className="list-group-item">
                                    Ordered on:{moment(o.createdAt).fromNow()}
                                </li>

                                <li className="list-group-item">
                                    Delivery address:{o.address}
                                </li>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{o.products.length}
                                </h3>
                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{
                                        padding: "20px", border: "1px solid blue"
                                    }}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product Id', p._id)}

                                    </div>
                                ))}
                            </ul>
                        </div>)
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;