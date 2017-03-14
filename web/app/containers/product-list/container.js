import React from 'react'

import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = () => {
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <ProductListHeader />
            }
            <ProductListContents />
        </div>
    )
}

export default ProductList
