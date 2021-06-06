import { observer } from 'mobx-react';
import React, { Props } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { ProductItem } from './product-item.component';
import { brandStore } from '../stores/brand.store';
import { filters, productFilters, productStore } from '../stores/product.store';

interface IReactRouterParams {
    match: any
}

@observer
export class ProductsComponent extends React.Component< IReactRouterParams, {} > {
    
    componentDidMount() {
        let genderId = this.props.match.params.gender;
        ( async () => {
            await brandStore.getAllBrands();
        })();


        if ( !filters["gender_id"] && !filters["type_id"] ){
            if ( genderId === "man") {
                productStore.getProductsByGender( 1 );
            }
            else {
                productStore.getProductsByGender( 2 );
            }
        }
        else {
            debugger
            genderId === "man" ? productStore.setFiltersClient( "gender_id", 1 ) : productStore.setFiltersClient( "gender_id", 2 );
            productStore.getProductsByFilters();
        }
    }
    render() {
        let genderId = this.props.match.params.gender;
        return <div className="products-wrapper">
            <Switch>
                <Route path = "/:gender/products/:id" component = {ProductItem}/>
            </Switch>
            <div className="filters">
                {
                    brandStore.brands.map( brand => {
                        return ( <div>
                            <input type="checkbox" id = { brand.id } name = { brand.id } onChange = { e => { productStore.setFiltersClient( "brand_id", brand.id ) } }/>
                            <label>{ brand.id }</label>
                        </div>)
                    } )
                }
                <button onClick = { e => { productStore.applyFilters() } }>Apply Filters</button>
            </div>
        <h1>Products</h1>
        <ul>
        { productStore.products.map( productItem => {
            return <li key = { productItem.id }><NavLink to={`/${genderId}/products/${productItem.id}`}>Name: { productItem.name }, Gender: { productItem.gender_id }, Brand: { productItem.brand_id }, Type: { productItem.type_id }</NavLink></li>
        }) }
        </ul>
       
    </div>
    }
}