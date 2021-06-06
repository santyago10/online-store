import * as express from 'express';
import { SentOrderService } from '../services/sent-order.service';

export class SentOrderController {
    public service: SentOrderService = new SentOrderService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ){
            console.log( "sent order controller, create ", err );
            response.send( err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ){
            console.log( "sent order controller, getAll ", err );
            response.send( err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getById( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "sent order controller, getById ", err );
            response.send( err );
        }
    }

    public getByOrderId = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getByOrderId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "sent order controller, getById ", err );
            response.send( err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedOrder = await this.service.edit( request.params.id, request.body );
            response.send( updatedOrder );
        }
        catch ( err ){
            console.log( "sent order controller, edit ", err );
            response.send( err );
        }
    }
     
    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ){
            console.log( "sent order controller, delete ", err );
            response.send( err );
        }
    }
}