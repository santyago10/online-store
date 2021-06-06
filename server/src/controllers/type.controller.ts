import * as express from 'express';
import { ProductTypeService } from '../services/type.service';

export class ProductTypeController {
    public service: ProductTypeService = new ProductTypeService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "product type controller, create" + err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ) {
            response.send( "product type controller, getAll" + err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedProductType = await this.service.edit( request.params.id, request.body );
            response.send( updatedProductType );
        }
        catch ( err ) {
            response.send( "product type controller, edit" + err );
        }
    }
     
    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ) {
            response.send( "product type controller, delete" + err );
        }
    }
}