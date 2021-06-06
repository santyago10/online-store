import * as express from 'express';
import { GenderService } from '../services/gender.service';

export class GenderController {
    public service: GenderService = new GenderService();

    public create = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body );
            response.send( result );
        }
        catch ( err ) {
            response.send( "gender controller, create" + err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ) {
            response.send( "gender controller, getAll" + err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "gender controller, getById", err );
            response.send( err );
        }
    }

    public edit = async ( request: express.Request, response: express.Response ) => {
        try {
            const updatedGender = await this.service.edit( request.params.id, request.body );
            response.send( updatedGender );
        }
        catch ( err ) {
            response.send( "gender controller, edit" + err );
        }
    }
     
    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ) {
            response.send( "gender controller, delete" + err );
        }
    }
}