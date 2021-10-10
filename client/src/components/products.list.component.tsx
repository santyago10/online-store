import { observer } from 'mobx-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { brandStore } from '../stores/brand.store';
import {  productStore } from '../stores/product.store';

interface IReactRouterParams {
    match: any
}

@observer
export class ProductsListComponent extends React.Component< IReactRouterParams, {} > {
    
    render() {
        return <div className="products-wrapper">
            <div className="filters">
                {
                    brandStore.brands.map( brand => {
                        return ( <div key = { brand.id }>
                            <input type="checkbox" name = { brand.id } onChange = { e => { productStore.setFiltersClient( "brand_id", brand.id ) } }/>
                            <label>{ brand.id }</label>
                        </div>)
                    } )
                }
                <button onClick = { e => { productStore.applyFilters() } }>Apply Filters</button>
            </div>
        <h1>Products</h1>
        <ul>
        { productStore.products.map( productItem => {
            return <li key = { productItem.id }><NavLink to={`/products/${productItem.id}`}>Name: { productItem.name }, Gender: { productItem.gender_id }, Brand: { productItem.brand_id }, Type: { productItem.type_id }</NavLink></li>
        }) }
        </ul>
       
    </div>
    }
}