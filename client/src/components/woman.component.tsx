import { observer } from 'mobx-react';
import React from 'react';
import { productStore } from '../stores/product.store';

@observer
export class WomanComponent extends React.Component {
    componentDidMount() {
        productStore.getProductsByGender( 2 );
    }
    render() {
        return <div className="woman-component">
        <h1>Woman</h1>
        <ul>
        { productStore.products.map( productItem => {
                return <li key = { productItem.id }>Name: { productItem.name }, Gender: { productItem.gender_id }, Brand: { productItem.brand_id }, Type: { productItem.type_id }</li>
        }) }
        </ul>
       
    </div>
    }
}