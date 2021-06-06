import * as React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { ProductTypeComponent } from "./product-type.component";
import { MainComponent } from "./main.component";
import { ProductsComponent } from "./products";

export class RouterComponent extends React.Component {
    render(){
        return <div className="main-page">
           <Router>
                 <Switch>
                    <Route exact path = "/" component = { MainComponent }/>
                    {/* <Route path = "/woman" component = { ProductTypeComponent }/> */}
                    <Route exact path = "/:gender" component = { ProductTypeComponent }/>
                    <Route path = "/:gender/products" component = { ProductsComponent }></Route>
                </Switch>
        </Router>            
        </div>
    }
}