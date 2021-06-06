import * as express from 'express';
import { SizeService } from '../services/size.service';

export class SizeController {
    public service: SizeService = new SizeService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "size controller, create" + err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ) {
            response.send( "size controller, getAll" + err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "size controller, getById", err );
            response.send( err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedSize = await this.service.edit( request.params.id, request.body );
            response.send( updatedSize );
        }
        catch ( err ) {
            response.send( "size controller, edit" + err );
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