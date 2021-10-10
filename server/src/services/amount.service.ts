import express from 'express';
import { getRepository } from 'typeorm';
import Amount from '../models/amount.entity';
import Product from "../models/product.entity";

export class AmountService {
    private amountRepository;
    private productRepository;
    private manager;
    
    constructor(){
        this.amountRepository = getRepository( Amount );
        this.productRepository = getRepository( Product );
        this.manager = this.amountRepository.manager;
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

    public getOneSizeByProductId = async ( id, body ) => {
        try {
            let productId = await this.productRepository.findOne( id );
            // let resultsByProduct = await this.amountRepository.find( { product_: productId } );
            let resultsByProduct = await this.amountRepository.query(`SELECT * FROM amount WHERE product_id=${ productId.id } AND size_id='${ body.productSize }'`);
            return resultsByProduct.length > 0 ? resultsByProduct : "Product with this id isn't exist";
        }
        catch( err ) {
            return ( "amount service, getByProductId" + err );
        }
    }

    public edit = async ( id, body: any ) => {
        try{ 
            await this.manager.decrement(Amount, { product_: id, size_: body.product_size }, "amount", body.newAmount );
            const updatedAmount = await this.amountRepository.findOne( { product_: id, size_: body.product_size } );
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

    public incrementAmount = async ( id, body: any ) => {
        try{ 
            await this.manager.increment(Amount, { product_: id, size_: body.product_size }, "amount", body.newAmount );
            const updatedAmount = await this.amountRepository.findOne( { product_: id, size_: body.product_size } );
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