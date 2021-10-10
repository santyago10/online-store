import * as React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { ProductTypeComponent } from "./product-type.component";
import { MainComponent } from "./main.component";
import { ProductsComponent } from "./products";
import { ProductItem } from "./product-item.component";
import { BagComponent } from "./bag.component";
import { OrderComponent } from "./order";

export class RouterComponent extends React.Component {
    render(){
        return <div className="main-page">
           <Router>
                <Switch>
                    <Route exact path = "/" component = { MainComponent }/>
                    <Route exact path = "/bag" component = { BagComponent }/>
                    <Route exact path = "/products/:id" component = { ProductItem }/>
                    <Route exact path = "/order" component = { OrderComponent }/>
                    <Route exact path = "/:gender" component = { ProductTypeComponent }/>
                    <Route exact path = "/:gender/products" component = { ProductsComponent }/>
                </Switch>
        </Router>            
        </div>
    }
}