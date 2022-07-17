import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, price, key} = props.product;
    const ReviewItemStyle ={
        padding: '5px',
        paddingBottom: '5px',
        borderBottom: '1px solid lightGray',
        marginBottom: '5px',
        marginLeft: '180px',
    }
    return (
        
        <div style={ReviewItemStyle}>
            <h2>{name}</h2>
            <p>quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button style={{backgroundColor:'yellowGreen',width:'150px'}} onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;