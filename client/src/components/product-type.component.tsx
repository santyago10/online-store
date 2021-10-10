import { observer } from 'mobx-react';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { productStore } from "../stores/product.store";
import { ProductsComponent } from './products';

interface IReactRouterParams {
    match: any
}

export let genderId : string;

@observer
export class ProductTypeComponent extends React.Component<IReactRouterParams, {}> {
    render() {

        { 
            genderId = this.props.match.params.gender;
            if ( genderId === "men" || genderId === "woman" ) {

                return <div className="woman-component">
                    <NavLink to = { `/${ genderId }/products` } onClick = { e => { productStore.setFiltersClient( "type_id", 5 ) } }>Trainers</NavLink>
                    <NavLink to = { `/${ genderId }/products` } onClick = { e => { productStore.setFiltersClient( "type_id", 2 ) } }>Hoodie</NavLink>
                    <NavLink to = { `/${ genderId }/products` } onClick = { e => { productStore.setFiltersClient( "type_id", 4 ) } }>Jacket</NavLink>
                </div>
            }
            else
            return <h2>Not Found</h2>
        } 
    }
}