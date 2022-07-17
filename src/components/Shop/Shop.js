import { getByDisplayValue } from '@testing-library/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from "../../fakeData";
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    // console.log(fakeData)
    const [products, setProducts] = useState(fakeData.slice(0, 10));
    const [cart, setCart] = useState([])

    useEffect(() => {
        const saveCart = getStoredCart()
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(pdkeys => {
            const product = fakeData.find(pd => pd.key === pdkeys);
            product.quantity = saveCart[pdkeys]
            return product
        })
        setCart(cartProducts)

    }, [])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key) // item ordered in cart did not increases but quantity will increases you will see in review order page where set quantity
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]

        }
        // const count =  sameProduct.length
        // console.log("product added", product);
        // const newCart = [...cart, product];
        setCart(newCart);
        // console.log(newCart);

        addToDb(product.key, count)


    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                <ul>
                    {
                        products.map(productList =>
                            <Product
                                showAddToCart={true}
                                handleAddProduct={handleAddProduct}
                                key={productList.key}
                                product={productList}>
                            </Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review' style={{textDecoration: 'none'}}>
                        <button className='btn-grad'>Review Order</button>
                    </Link>

                </Cart>
            </div>


        </div>
    );
};

export default Shop;