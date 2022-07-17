import React from 'react';
// import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    console.log(props);
    const { name, img, seller, stock, price, key } = props.product //destructuring
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div style={{ marginLeft: "8px" }}>
                <h3 className='product-name'><Link to={"/product/" + key}>{name}</Link></h3><br />
                <p>by: {seller}</p><br />
                <h3>${price}</h3>
                <p>only {stock} left in stock- order soon</p>
            
                {props.showAddToCart === true && <button className='btn-grad' onClick={() => { props.handleAddProduct(props.product) }}> <FontAwesomeIcon icon={faCartPlus} />add to cart</button>}

            </div>


        </div>
    );
};




export default Product;

