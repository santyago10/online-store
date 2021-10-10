import * as React from "react";
import { NavLink } from "react-router-dom";
import { productStore } from "../stores/product.store";

export class MainComponent extends React.Component {
    render() {
        return <div className="main-page">
            <NavLink to = { "/men" } onClick = { e => productStore.setFiltersClient( "gender_id", 1 ) }>Men</NavLink>
            <NavLink to = { "/woman" } onClick = { e => productStore.setFiltersClient( "gender_id", 2 ) }>Woman</NavLink>                
        </div>
    }
}