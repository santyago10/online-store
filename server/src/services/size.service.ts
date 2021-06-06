import express from 'express';
import { getRepository } from 'typeorm';
import Size from '../models/size.entity';

export class SizeService {
    private sizeRepository;
    
    constructor(){
        this.sizeRepository = getRepository( Size );
    }

    public create = async ( body: Object ) => {
        try{
            const newSize = await this.sizeRepository.create( body );
            await this.sizeRepository.save( newSize );
            return( newSize );
        }
        catch( err ){
            return ( "size service, create" + err );
        }
    } 

    public getAll = async () => {
        try {
            const sizes: Object = await this.sizeRepository.find();
            return ( sizes );
        }
        catch( err ){
            return ( "size service, getAll" + err );
        }
    }

    public getbyId = async ( id ) => {
        try {
            return ( await this.sizeRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "size service, getById" + err );
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            if( !await this.sizeRepository.findOne( id ) ){
                return `Id ${ id } Not Found`;
            }
            let updatedSize = await this.sizeRepository.update( id, body );
            return updatedSize.affected ? "Updated successfully" : "Not updated, smth wrong";
        }
        catch ( err ) {
            return ( "size service, edit" + err );
        }
    }
    
    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.sizeRepository.delete( id );

            if ( deleteResponse.affected !== 0)  {
                return ( "Deleted successfully" );
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "size service, delete" + err );
        }
    }
}