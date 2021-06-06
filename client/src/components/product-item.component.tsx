import { observer } from 'mobx-react';
import React from 'react';
import { productStore } from '../stores/product.store';

interface IReactRouterParams {
    match: any
}

export class ProductItem extends React.Component< IReactRouterParams, {} > {
    
    render() {
        const prodId = this.props.match.params.id;
        let product;
        for(var i=0; i<productStore.products.length; i++){
            debugger
            if(productStore.products[i].id==prodId){
                product = productStore.products[i];
            }
        }

        if(product){
            console.log( product)
            return <h3>{product.name}</h3>
        }
        else {
            return <h3>Not Found</h3>
        }

    }
}