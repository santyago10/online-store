import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { brandStore } from '../stores/brand.store';
import { filters, productStore } from '../stores/product.store';
import { ProductsListComponent } from './products.list.component';

interface IReactRouterParams {
    match: any
}

@observer
export class ProductsComponent extends React.Component< IReactRouterParams, {} > {
    
    componentDidMount() {
        alert("Check in bag,, check render in products, routes, apply filters client()");
        ( async () => {
            await brandStore.getAllBrands();
        })();
    }
    render() {
        let genderId = this.props.match.params.gender;

        // Check if filters are applied
        if ( !filters["gender_id"] && !filters["type_id"] ){
            if ( genderId === "men") {
                productStore.getProductsByGender( 1 );
                productStore.setFiltersClient( "gender_id", 1 );
            }
            else if ( genderId === "woman" ) {
                productStore.getProductsByGender( 2 );
                productStore.setFiltersClient( "gender_id", 2 );
            }
            else {
                return <h2>Not Found</h2>
            }
        }
        else if ( genderId === "men" || genderId === "woman" ) {
            genderId === "men" ? productStore.setFiltersClient( "gender_id", 1 ) : productStore.setFiltersClient( "gender_id", 2 );
            productStore.applyFilters();
        }
        else {
            return <h2>Not Found</h2>
        }
        
        return <div className="products-wrapper">
            <h2>STORE</h2>
            {/* <Switch>
                <Route exact path = "/:gender/products" component = {ProductsListComponent}/>
            </Switch> */}
            <ProductsListComponent match = { this.props.match }/>
    </div>
    }
}