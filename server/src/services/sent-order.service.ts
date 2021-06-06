import express from 'express';
import Order from '../models/order.entity';
import { getRepository } from 'typeorm';
import SentOrder from '../models/sent-order.entity';

export class SentOrderService {
    private orderRepository;
    private firstOrderRepository;
    
    constructor(){
        this.orderRepository = getRepository( SentOrder );
        this.firstOrderRepository = getRepository( Order );
    }

    public create = async ( body: Object ) => {
        try{
            const newOrder = await this.orderRepository.create( body );
            let result = await this.orderRepository.save( newOrder );
            return( result );
        }
        catch( err ){
            return ( "sent order service, create " + err);
        }
    } 

    public getAll = async () => {
        try {
            const orders: Object = await this.orderRepository.find();
            return ( orders );
        }
        catch( err ){
            return ( "sent order service, getAll " + err);
        }
    }

    public getById = async ( id ) => {
        try {
            return ( await this.orderRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "sent order service, getById " + err);
        }
    }

    public getByOrderId = async ( id ) => {
        try {
            let orderId = await this.firstOrderRepository.findOne( id );
            let result = await this.orderRepository.findOne( { order_: orderId } );
            if ( !result ) {
                return "Такого ID нету";
            }

            return result;
        }
        catch( err ){
            console.error( err );
            return ( "sent order service, getByOrderId " + err );
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
            return ( "sent order service, edit " + err);
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
            return ( "sent order service, delete " + err);
        }
    }
}