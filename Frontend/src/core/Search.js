import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';
const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data })
            };
        });
    };
    // searchData-make api request and get the products
    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        setData({ ...data, results: response, searched: true })
                    };
                });
        };
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = (name) => event => {
        setData({ ...data, [name]: event.target.value, searched: false })
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        };
        if (searched && results.length < 1) {
            return `No products found`;
        };
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4 text-primary" >
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <div key={i} className="col-4 mt-3">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div >
        );
    };

    useEffect(() => {
        loadCategories()
    }, []);

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="form-row align-items-center">
                <div className="col-12 col-md-3">
                    <select className="form-control mr-2" onChange={handleChange("category")}>
                        <option value="All">All categories</option>
                        {categories.map((c, i) =>
                            (<option key={i} value={c._id}>{c.name}</option>
                            ))}
                    </select>
                </div>
                <div className="col-12 col-md-9 col-lg-6 mt-2 mt-md-0">
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="search by name" />
                </div>
                <div className="col-12 col-lg-3 mt-2 mt-lg-0">
                    <button className="btn btn-outline-secondary btn-block">Search</button>
                </div>
            </div>
            {/* <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All categories</option>
                            {categories.map((c, i) =>
                                (<option key={i} value={c._id}>{c.name}</option>
                                ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="search by name" />
                </div>

                <div className="btn input-group-append" style={{ border: 'none' }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span> */}
        </form >
    );


    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>

            <div className="container-fluid mb-3">{searchedProducts(results)}</div>
        </div >

    );
};

export default Search;