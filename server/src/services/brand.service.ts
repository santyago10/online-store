import express from 'express';
import { getRepository } from 'typeorm';
import Brand from '../models/brand.entity';

export class BrandService {
    private brandRepository;
    
    constructor(){
        this.brandRepository = getRepository( Brand );
    }

    public create = async ( body: Object ) => {
        try{
            const newBrand = await this.brandRepository.create( body );
            let result = await this.brandRepository.save( newBrand );
            return( result );
        }
        catch( err ){
            return ( "brand service, create" + err);
        }
    } 

    public getAll = async () => {
        try {
            const brand: Object = await this.brandRepository.find();
            return ( brand );
        }
        catch( err ){
            return ( "brand service, getAll" + err);
        }
    }

    public getbyId = async ( id ) => {
        try {
            return ( await this.brandRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "brand service, getById" + err);
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            if( !await this.brandRepository.findOne( id ) ){
                return `Id ${ id } Not Found`;
            }
            let updatedBrand = await this.brandRepository.update( id, body );
            return updatedBrand.affected ? "Updated successfully" : "Not updated, smth wrong";
        }
        catch ( err ) {
            return ( "brand service, edit " + err);
        }
    }
    
    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.brandRepository.delete( id );
            if (deleteResponse.affected !== 0) {
            return ( "Deleted successfully" );
            } else {
            return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "brand service, delete" + err);
        }
    }
}