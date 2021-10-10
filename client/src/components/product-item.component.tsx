import { observer } from 'mobx-react';
import React from 'react';
import { amountStore } from '../stores/amount.store';
import { bagStore } from '../stores/bag.store';
import { productStore } from '../stores/product.store';

interface IReactRouterParams {
    match: any
}

interface IState {
    product: any;
}

let productId: number;

@observer
export class ProductItem extends React.Component< IReactRouterParams, IState > {

    private size: string;

    constructor( props: IReactRouterParams ) {
        super( props );
        this.state = { product: [] };
        this.size = "";

    }
    componentDidMount() {
        productId = this.props.match.params.id;
        console.log (productId)
        new Promise( ( resolve, reject ) => {
            resolve ( productStore.getProductById( productId ) )
        } )
        .then( result => {
            this.setState( { product: result } );
        }, error => {
            alert( error );
        })

        amountStore.getSizes( productId )
    }

    render() {
        // const prodId = this.props.match.params.id;
        // let product;
        // console.log(productStore.products);
        // for(var i=0; i<productStore.products.length; i++){
        //     console.log(productStore.products[i].id);
        //     if(productStore.products[i].id==prodId){
        //         product = productStore.products[i];
        //     }
        // }

        if( this.state.product[0] ){
            return <div>
                <h3>{ this.state.product[0].name }</h3>

                <select name="sizes" id="sizes" onChange = { e => this.size =  e.target.options[e.target.selectedIndex].text }>
                    <option selected disabled>Choose size</option>
                    {
                        amountStore.sizes.map( item => {
                            return item.amount > 0 ? <option value = { item.size_id }>{ item.size_id }</option> : null
                        })
                    }
                </select>
                <br/>
                <button onClick = { e => bagStore.addToBag( this.state.product[0].id, this.size, this.state.product[0].currentPrice ) }>Add to bag</button>
            </div>
        }
        else {
            return <h3>Not Found</h3>
        }

    }
}