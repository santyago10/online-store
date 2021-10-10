import { observer } from 'mobx-react';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { bagStore } from '../stores/bag.store';
import { productModel, productStore } from '../stores/product.store';

interface IProps {
    props: any
}

interface IState {
    parsedBag: []
}

@observer
export class BagComponent extends React.Component<IProps, IState> {

    constructor( props: IProps ) {
        super( props );
        // let products: any = [];
        // products = localStorage.getItem( "prodId" );
        // let parsedIds = JSON.parse( products );

        // this.state = { parsedBag: parsedIds };
        // productStore.getByIds( parsedIds )

        // productStore.setTotal( this.state.parsedBag );
        bagStore.getBagProducts();
    }
    
    render() {
        if( bagStore.bagProducts.length === 0 ) {
            return <h2>Ваша корзина пуста</h2>
        }

        return <div>
            <ul>
                {
                    bagStore.bagProducts.map( ( item: { id: number, size: string, count: number, price: number } ) => {
                        if (item.count === null) {
                            item.count = 1;
                        }
                        return <li>{ item.id }, Size: { item.size } Count: <input type="number" min="1" max="100" value = { item.count } onFocus = { e => bagStore.getPreviousAmount( e, item.count ) } onChange = { e => bagStore.setInputAmountValue( e, item.id, item.size, e.target.value ) } onBlur = { e => bagStore.onBlurInputAmountValue( e, item.id, item.size) }/> Price: { item.price } <button onClick = { e => bagStore.removeFromBag( item.id, item.size, item.count ) }>Удалить</button></li>
                        // return <li>{ item.id } Price: { item.currentPrice } Count: <input type="number" min="1" max="100" onChange = { e => productStore.setTotal( Number.parseInt( e.target.value ), item.currentPrice ) }/></li>
                    })
                }
            </ul>

            <h4>Total: { bagStore.totalPrice }</h4>
        </div>
    }
}