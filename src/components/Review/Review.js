import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import fakeData from '../../fakeData';
import { clearTheCart, deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [reviewCart, setReviewCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        console.log('Order placed')
        setReviewCart([]);
        clearTheCart();
        setOrderPlaced(true)
    };

    const removeProduct = (productKey) => {
        console.log('remove clicked', productKey);
        const newCart = reviewCart.filter(pd => pd.key !== productKey);
        setReviewCart(newCart);
        deleteFromDb(productKey);
    }

    useEffect(() => {
        //data comes from cart state
        const saveCart = getStoredCart()
        console.log(saveCart);
        const productKeys = Object.keys(saveCart) // Object.Values (saveCart)
        console.log(productKeys)
        const cartProducts = productKeys.map(key => {
            // saveCart[key]
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product
        })
        setReviewCart(cartProducts)

    }, [])

    let placeOrderImage; 
    if (orderPlaced) {
        placeOrderImage  = <img src={happyImage} alt="" />
    }
    
    

    return (
        <div className="shop-container">
            <div className="product-container">
                {/* <h2>Review Items: {cart.length}</h2> */}
                {
                    reviewCart.map(pd => <ReviewItem
                        product={pd}
                        removeProduct={removeProduct}
                        key={pd.key} >

                    </ReviewItem>)
                }

                {placeOrderImage}

            </div>
            <div className="cart-container">
                <Cart cart={reviewCart}>
                    <Link to='/review' style={{textDecoration: 'none'}}>
                        <button className='btn-grad' onClick={handlePlaceOrder}>Place Order</button>
                    </Link>

                </Cart>
            </div>
        </div>


    );
};

export default Review;