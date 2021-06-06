import { observer } from 'mobx-react';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { productStore } from "../stores/product.store";
import { ProductsComponent } from './products';

interface IReactRouterParams {
    match: any
}

@observer
export class ProductTypeComponent extends React.Component<IReactRouterParams, {}> {
    render() {
        { 
            if( productStore.gender === "man") {
                return <div className="woman-component">
                    <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 5 ) } }>Trainers</NavLink>
                    <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 2 ) } }>Hoodie</NavLink>
                    <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 4 ) } }>Jacket</NavLink>
                </div>
            }
            else if ( productStore.gender === "woman") {
                return <div className="woman-component">
                    <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 5 ) } }>Trainers</NavLink>
                    <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 2 ) } }>Hoodie</NavLink>
                    <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 4 ) } }>Jacket</NavLink>
                </div>
            }
            else {
                let genderId = this.props.match.params.gender;
                if ( genderId === "man") {
                    return <div className="woman-component">
                        <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 5 ) } }>Trainers</NavLink>
                        <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 2 ) } }>Hoodie</NavLink>
                        <NavLink to = "/man/products" onClick = { e => { productStore.setFiltersClient( "type_id", 4 ) } }>Jacket</NavLink>
                    </div>
                }
                else {
                    return <div className="woman-component">
                        <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 5 ) } }>Trainers</NavLink>
                        <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 2 ) } }>Hoodie</NavLink>
                        <NavLink to = "/woman/products" onClick = { e => { productStore.setFiltersClient( "type_id", 4 ) } }>Jacket</NavLink>
                    </div>
                }
            }
        } 
    }
}