import express from 'express';
import { getRepository } from 'typeorm';
import Amount from '../models/amount.entity';
import Product from "../models/product.entity";

export class AmountService {
    private amountRepository;
    private productRepository;
    
    constructor(){
        this.amountRepository = getRepository( Amount );
        this.productRepository = getRepository( Product );
    }

    public create = async ( body: Object ) => {
        try{
            const newAmount = await this.amountRepository.create( body );
            await this.amountRepository.save( newAmount );
            return( newAmount );
        }
        catch( err ){
            return ( "amount service, create" + err );
        }
    } 

    public getAll = async () => {
        try {
            const productsAmount: Object = await this.amountRepository.find();
            return ( productsAmount );
        }
        catch( err ){
            return ( "amount service, getAll" + err );
        }
    }

    public getbyId = async ( id ) => {
        try {
            return ( await this.amountRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "amount service, getById" + err );
        }
    }

    public getByProductId = async ( id ) => {
        try {
            let productId = await this.productRepository.findOne( id );
            // let resultsByProduct = await this.amountRepository.find( { product_: productId } );
            let resultsByProduct = await this.amountRepository.query(`SELECT * FROM amount WHERE product_id=${ productId.id }`);
            return resultsByProduct.length > 0 ? resultsByProduct : "Product with this id isn't exist";
        }
        catch( err ) {
            return ( "amount service, getByProductId" + err );
        }

    }

    public edit = async ( id, body: Object ) => {
        try{ 
            await this.amountRepository.update( id, body );
            const updatedAmount = await this.amountRepository.findOne( id );
            if ( updatedAmount ) {
                return updatedAmount;
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "amount service, edit" + err );
        }
    }

    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.amountRepository.delete( id );
            if (deleteResponse.affected !== 0) {
            return ( "Deleted successfully" );
            } else {
            return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "amount service, delete" + err);
        }
    }
}