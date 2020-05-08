import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);



    const init = () => {
        getCategories().then(data => {
            if (error) {
                setError(data.error)
            } else {
                setCategories(data)
            };
        });
    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            };
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            };
        });
    };
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            ));
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        };
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            };
        };
        return array
    };

    return (
        <Layout title='Cat Shop' description='Miau!' className="container-fluid shop">
            <div className="row">
                <div className="col-12 col-md-3 col-lg-2">
                    <h6>Filter by categories:</h6>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters =>
                            handleFilters(filters, "category")
                        } />
                    </ul>
                    <hr />
                    <h6>Filter by price range:</h6>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            } />
                    </div>
                </div>

                <div className="col-12 col-md-9 col-lg-10">
                    <h4 className="mb-4">Products:</h4>
                    <div className="row">
                        {/* {JSON.stringify(filteredResults)} */}
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-12 col-md-6 col-lg-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>

                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout >
    );
};

export default Shop;