import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                type="radio"
                className="mr-2 ml-4"
                // can select only one price interval
                name={p}
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};
/* eslint-enable no-unused-vars */
export default RadioBox;