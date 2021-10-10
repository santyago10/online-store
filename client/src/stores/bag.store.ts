import { BagItem } from '../models/bag';
import { types, unprotect } from "mobx-state-tree";
import '../App.css';
import { BagService } from '../services/api-services/bag-service';
import { AmountService } from '../services/api-services/amount-service';
import React from 'react';

const service: BagService = new BagService();
const amountService: AmountService = new AmountService();
let bagProducts: any = [];

export const productModel = BagItem.create({
  id: 0
});

export const BagStore = types.model({
  bagProducts: types.array( BagItem ),
  bagItemNumber: types.optional( types.number, 0 ),
  totalPrice: types.optional( types.number, 0 ),
  inputAmountValue: types.optional( types.number, 1 ),
  updateAmountButton: types.optional( types.boolean, false ),
  previousAmount: types.optional( types.number, 1 ),
  isAmountUpdated: types.optional( types.boolean, false ),
})
.actions( self => ({

    onUnload () {
        if( !self.isAmountUpdated ) {

        }
    },

    setTotal () {
        self.totalPrice = 0;
        if( self.bagProducts.length > 0 ) {
            self.bagProducts.map( ( item: { total: number; } ) => {
                self.totalPrice += item.total || 0;
            } )
        }
    },

    getBagProducts () {
        let products = localStorage.getItem( "prodId" );
        let parsedProducts = products ? JSON.parse( products ) : [];

        parsedProducts.map( (item: { count: number; price: number; total: number }) => {
            item.count = item.count ? item.count : 1;
            item.total = item.total ? item.total : item.price * item.count;
        });
        self.bagProducts = parsedProducts;
        this.setTotal();
    },

    async addToBag( id: number, size: string, price: number ) {
        debugger
        if( size === "" ) {
            alert( "Выберите размер" );
            return
        }

        let sizeObject = await amountService.getOneSizeAmount( id, size );

        if( sizeObject.toString().includes("Error") || sizeObject.toString().includes("error") ) {
            alert ( "Ошибка! Попробуйте позже" )
            return
        }
        else if ( sizeObject[0].amount <= 0 ) {
            alert( "Этот размер закончился" );
            return
        }


        let products = localStorage.getItem( "prodId" );
        let bag = [];
        let isExist: boolean = false;

        if( !products ) {
            bag.push( {
                id: id,
                size: size,
                price: price,
                count: 1,
                total: price
            } )

            localStorage.setItem( "prodId", JSON.stringify( bag ) );

            self.bagProducts.push( {
                id: id,
                size: size,
                price: price,
                count: 1,
                total: price
            } )
            await amountService.updateAmount( id, size, 1 );
        } 
        else {

            bagProducts = products;
            bag = JSON.parse(bagProducts);

            bag.map( (item: { id: number | string; size: string } ) => {
                if ( item.id === id && item.size === size ){
                    isExist = true;
                    alert( "Товар такого размера уже в корзине" );
                }
            });

            if( !isExist ) {
                bag.push( {
                    id: id,
                    size: size,
                    price: price,
                    count: 1,
                    total: price
                } )

                //Decrement amount
                await amountService.updateAmount( id, size, 1 );
            }

            localStorage.setItem( "prodId", JSON.stringify( bag ) );
            self.bagProducts = bag;
        }
    },

    async removeFromBag( id: number, size: string, count: number ) {
        let products = localStorage.getItem( "prodId" );
        let bag = products ? JSON.parse( products ) : [];

        debugger
        let incrementResult = await amountService.incrementAmount( id, size, count );

        debugger

        if( incrementResult.toString().includes("Error") || incrementResult.toString().includes("error") ) {
            alert ( "Ошибка! Попробуйте позже" )
            return
        }

        for ( let i = 0; i < bag.length; i++ ) {
            if ( bag[i].id === id && bag[i].size === size ) {
                bag.splice( i, 1 );
                break;
            }
        }

        localStorage.setItem( "prodId", JSON.stringify( bag ) );
        self.bagProducts = bag;
        this.setTotal();
    },

    async setProductTotalPrice ( e: any, id: number, size: string ) {
        self.isAmountUpdated = true;
        let currentInputValue = self.inputAmountValue;
        let previousValue = self.previousAmount;
        debugger
        let products = localStorage.getItem( "prodId" );
        let parsedProducts = products ? JSON.parse( products ) : null;

        if (currentInputValue > previousValue) {

            let sizeObject = await amountService.getOneSizeAmount( id, size );

            debugger

            if( sizeObject.toString().includes("Error") || sizeObject.toString().includes("error") ) {
                alert ( "Ошибка! Попробуйте позже" );
                return
            }
            else if ( sizeObject[0].amount < currentInputValue - previousValue ) {
                self.bagProducts[ self.bagItemNumber ].count = previousValue;
                self.bagProducts[ self.bagItemNumber ].total = self.bagProducts[ self.bagItemNumber ].price * previousValue;
                alert( `Осталось всего ${ sizeObject[0].amount } доступных к заказу` );
                return
            }

            let decrementResult = await amountService.updateAmount( id, size, currentInputValue - previousValue );

            if( decrementResult.toString().includes("Error") || decrementResult.toString().includes("error") ) {
                alert ( "Ошибка! Попробуйте позже" );
                return
            }
        }
        else if ( currentInputValue < previousValue ) {
            let incrementResult = await amountService.incrementAmount( id, size, previousValue - currentInputValue);

            if( incrementResult.toString().includes("Error") || incrementResult.toString().includes("error") ) {
                alert ( "Ошибка! Попробуйте позже" );
                return
            }
        }

        // for( let i = 0; i < parsedProducts.length; i++ ) {

        //     if( parsedProducts[i].id === id && parsedProducts[i].size === size ) {

        //         parsedProducts[i].count = self.inputAmountValue === 0 ? 1 : self.inputAmountValue;
        //         parsedProducts[i].total = parsedProducts[i].count ? parsedProducts[i].count * parsedProducts[i].price : parsedProducts[i].price;
        //         break;
        //     }
        // }

        localStorage.setItem( "prodId", JSON.stringify( self.bagProducts ) );
        // self.bagProducts = parsedProducts;

        this.setTotal( );

        self.previousAmount = self.inputAmountValue; // IMPORTANT!!! DON'T DELETE
    },

    async setInputAmountValue ( e: any, id: number, size: string, newValue: string ) {
        debugger
        self.inputAmountValue = Number.parseInt( newValue );
        self.updateAmountButton = true;

        // e.target.value = self.inputAmountValue; 
        // let products = localStorage.getItem( "prodId" );
        // let parsedProducts = products ? JSON.parse( products ) : null;
        
        for( let i = 0; i < self.bagProducts.length; i++ ) {

            if( self.bagProducts[i].id === id && self.bagProducts[i].size === size ) {
                self.bagItemNumber = i;
                self.bagProducts[i].count = self.inputAmountValue === 0 ? 1 : self.inputAmountValue;
                self.bagProducts[i].total = self.bagProducts[i].count ? self.bagProducts[i].count * self.bagProducts[i].price : self.bagProducts[i].price;
                break;
            }
        }

        // localStorage.setItem( "prodId", JSON.stringify( parsedProducts ) );
        // self.bagProducts = parsedProducts;

        // this.setTotal( );
    },

    //onBlur
    onBlurInputAmountValue( e: React.FocusEvent, id: number, size: string ) {
        debugger
        if( !self.inputAmountValue ) { //  || !self.isAmountUpdated
            debugger
            self.inputAmountValue = self.previousAmount; // or 1
            this.setInputAmountValue( e, id, size, self.inputAmountValue.toString() );
        }
        debugger
        this.setProductTotalPrice( e, id, size );
    },

    //onFocus
    async getPreviousAmount( e: any,  currentAmount: number ) {
        self.isAmountUpdated = false;
        self.previousAmount = currentAmount; 
        self.inputAmountValue = currentAmount;
        debugger;
    }
}))

export const bagStore = BagStore.create({});
unprotect( bagStore );






