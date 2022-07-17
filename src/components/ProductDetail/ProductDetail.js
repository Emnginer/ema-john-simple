import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams()
    const productDet = fakeData.find(pd => pd.key === productKey)
    console.log(productDet)
    return (
        <div>
            <h2>Product Details of {productKey}</h2>
            <Product product={productDet} showAddToCart={false}></Product>
            {/*you can also use Product components*/}
            {/* <h2>name{productDet.name}</h2> */}
        </div>
    );
};

export default ProductDetail;