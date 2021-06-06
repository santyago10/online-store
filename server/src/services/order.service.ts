import express from 'express';
import SentOrder from '../models/sent-order.entity';
import { getRepository } from 'typeorm';
import Order from '../models/order.entity';

export class OrderService {
    private orderRepository;
    private sentOrderRepository;
    
    constructor(){
        this.orderRepository = getRepository( Order );
        this.sentOrderRepository = getRepository( SentOrder );
    }

    public create = async ( body: Object ) => {
        try{
            const newOrder = await this.orderRepository.create( body );
            let result = await this.orderRepository.save( newOrder );
            return( result );
        }
        catch( err ){
            return ( "order service, create " + err);
        }
    } 

    public sendOrder = async ( id ) => {
        try {
            let order = await this.orderRepository.findOne( id );
            let data = {
                order_: order.id
            }
            let result = await this.sentOrderRepository.save( data );
            let deleteRespone = await this.orderRepository.delete( id );
            if ( !result ) {
                return "Не добавлено в таблицу отправленных заказов";
            }
            else if( deleteRespone.affected == 0 ){
                return "Не удалено с таблицы заказов";
            }

            return "Заказ перемещён в отправленные";
        }
        catch( err ){
            return ( "order service, sentOrder ERROR " + err );
        }
    }

    public getAll = async () => {
        try {
            const orders: Object = await this.orderRepository.find();
            return ( orders );
        }
        catch( err ){
            return ( "order service, getAll " + err);
        }
    }

    public getById = async ( id ) => {
        try {
            return ( await this.orderRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "order service, getById " + err);
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            await this.orderRepository.update( id, body );
            const updatedOrder = await this.orderRepository.findOne( id );
            if ( updatedOrder ) {
                return updatedOrder;
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "order service, edit" + err);
        }
    }
    
    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.orderRepository.delete( id );
            if (deleteResponse.affected !== 0) {
            return ( "Deleted successfully" );
            } else {
            return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "order service, delete" + err);
        }
    }
}