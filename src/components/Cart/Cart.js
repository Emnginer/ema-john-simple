import React from 'react';

const Cart = (props) => {
    const cart = props.cart

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = props.cart[i];
        total = total + element.price;
        
    }

    let shipping = 0;
    if(total > 50) {
        shipping = 0;
    } else if(total > 25) {
        shipping = 4.99
    } else if(total>0){
        shipping = 12.21
    }


    return (
        <div>
            <h2 className='orderSummary'>Order Summary</h2>
            <h3>Items Ordered: {cart.length}</h3>
            <h3>Product Price: {total.toFixed(2)}</h3>
            <h3>Shipping Cost: {shipping}</h3>
            <h3>Total Price: {(total + shipping).toFixed(2)}</h3>

        </div>
    );
};

export default Cart;