import * as express from 'express';
import { BrandService } from '../services/brand.service';

export class BrandController {
    public service: BrandService = new BrandService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ){
            console.log( "brand controller, create", err );
            response.send( err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ){
            console.log( "brand controller, getAll", err );
            response.send( err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "brand controller, getById", err );
            response.send( err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedBrand = await this.service.edit( request.params.id, request.body );
            response.send( updatedBrand );
        }
        catch ( err ){
            console.log( "brand controller, edit", err );
            response.send( err );
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