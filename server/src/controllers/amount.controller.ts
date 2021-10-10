import * as express from 'express';
import { AmountService } from '../services/amount.service';

export class AmountController {
    public service: AmountService = new AmountService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "amount controller, create" + err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ) {
            response.send( "amount controller, getAll" + err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "amount controller, getById", err );
            response.send( err );
        }
    }

    public getByProductId = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getByProductId( request.params.id );
            response.send( result );
        }
        catch ( err ) {
            response.send( "amount controller, getByProductId" + err );
        }
    }

    public getOneSizeByProductId = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getOneSizeByProductId( request.params.id, request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "amount controller, getByProductId" + err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedAmount = await this.service.edit( request.params.id, request.body );
            response.send( updatedAmount );
        }
        catch ( err ) {
            response.send( "amount controller, edit" + err );
        }
    }

    public incrementAmount = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedAmount = await this.service.incrementAmount( request.params.id, request.body );
            response.send( updatedAmount );
        }
        catch ( err ) {
            response.send( "amount controller, edit" + err );
        }
    }

    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ){
            console.log( "brand controller, delete", err );
            response.send( err );
        }
    }
}