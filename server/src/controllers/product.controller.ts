import * as express from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    public service: ProductService = new ProductService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "product controller, create" + err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ) {
            response.send( "product controller, getAll" + err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "product controller, getById", err );
            response.send( err );
        }
    }

    public getByGender = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getByGender( request.params.id );
            response.send( result );
        }
        catch ( err ) {
            response.send( "product controller, getByGender" + err );
        }
    }

    public getByFilters = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getByFilters( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "product controller, getByFilters" + err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedProduct = await this.service.edit( request.params.id, request.body );
            response.send( updatedProduct );
        }
        catch ( err ) {
            response.send( "product controller, edit" + err );
        }
    }

    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ) {
            response.send( "size controller, delete" + err );
        }
    }
}