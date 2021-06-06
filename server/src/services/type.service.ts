import express from 'express';
import { getRepository } from 'typeorm';
import ProductType from '../models/type.entity';

export class ProductTypeService {
    private productTypeRepository;
    
    constructor(){
        this.productTypeRepository = getRepository( ProductType );
    }

    public create = async ( body: ProductType ) => {
        try{
            if( await this.productTypeRepository.findOne( { name: body.name } )){
                return "This type is already exist";
            }
            const newProductType = await this.productTypeRepository.create( body );
            await this.productTypeRepository.save( newProductType );
            return( newProductType );
        }
        catch( err ){
            return ( "type service, create" + err);
        }
    }

    public getAll = async () => {
        try {
            const productType: Object = await this.productTypeRepository.find();
            return ( productType );
        }
        catch( err ){
            return ( "type service, getAll" + err);
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            if( !await this.productTypeRepository.findOne( id ) ){
                return `Id ${ id } Not Found`;
            }
            let updatedProductType = await this.productTypeRepository.update( id, body );
            return updatedProductType.affected ? "Updated successfully" : "Not updated, smth wrong";
        }
        catch ( err ) {
            return ( "type service, edit" + err);
        }
    }
    
    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.productTypeRepository.delete( id );
            if (deleteResponse.affected !== 0) {
                return "Deleted successfully";
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "type service, delete" + err);
        }
    }
}