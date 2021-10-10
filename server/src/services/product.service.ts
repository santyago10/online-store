import express from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/product.entity';
import Gender from '../models/gender.entity';
import { type } from 'os';
import Amount from '../models/amount.entity';

export class ProductService {
    private productRepository;
    private genderRepository;
    private amountRepository;
    
    constructor(){
        this.productRepository = getRepository( Product );
        this.genderRepository = getRepository( Gender );
        this.amountRepository = getRepository( Amount );
    }

    // public create = async ( body: Object ) => {
    //     try {
    //         const newProduct = await this.productRepository.create( body );
    //         await this.productRepository.save( newProduct );
    //         return( newProduct );
    //     }
    //     catch( err ){
    //         return ( "product service, create" + err );
    //     }
    // } 

    public create = async ( body: Object ) => {
        try {
            for(let i = 0; i < 500; i++){
                let type_id = Math.round( Math.random() * (5 - 2) + 2 );
                if( type_id === 3 ){
                    type_id += 1;
                }
                let gender_id = Math.round( Math.random() * (2 - 1) + 1 );
                let brand_id = Math.round( Math.random() * (3 - 1) + 1 );
                let size_id = Math.round( Math.random() * (5 - 1) + 1 );
                let prodAmount = Math.round( Math.random() * (52 - 1) + 1 );
                let size_string;
                let brand_string;
                let name_string;
                let type_string;

                if( type_id === 2) {
                    type_string = "hoodie";
                }
                else if( type_id === 4 ) {
                    type_string = "jacket";
                }
                else if ( type_id === 5 ) {
                    type_string = "trainers";
                }

                if( gender_id === 1) {
                    name_string = "Men";
                }
                else if( gender_id === 2 ) {
                    name_string = "Woman";
                }

                if( brand_id === 1) {
                    brand_string = "nike";
                }
                else if( brand_id === 2 ) {
                    brand_string = "adidas";
                }
                else if ( brand_id === 3 ) {
                    brand_string = "puma";
                }

                if( size_id === 1) {
                    size_string = "42";
                }
                else if( size_id === 2 ) {
                    size_string = "43";
                }
                else if ( size_id === 3 ) {
                    size_string = "m";
                }
                else if ( size_id === 4 ) {
                    size_string = "l";
                }
                else if ( size_id === 5 ) {
                    size_string = "xl";
                }


                console.log( type_id, gender_id, brand_string, size_string, prodAmount);
                let body = {
                    name:`${ name_string } ${ type_string } ${ brand_string }`,
                    model:"test",
                    vendorCode:"test",
                    description:"test",
                    firstPrice:2000,
                    currentPrice:1500,
                    photos:"test",
                    gender_: gender_id,
                    brand_: brand_string,
                    type_: type_id
                }

                console.log( body.name)

              
                const newProduct = await this.productRepository.create( body );
                await this.productRepository.save( newProduct );

                // let prodId = Math.round( Math.random() * (198 - 1) + 1 );

                let amountData = {
                    product_: newProduct.id,
                    size_: size_string,
                    amount: prodAmount
                }

                const newAmount = await this.amountRepository.create( amountData );
                await this.amountRepository.save( newAmount );

            }
            console.log("FINISHED");

        }
        catch( err ){
            return ( "product service, create" + err );
        }
    } 

    public getAll = async () => {
        try {
            const products: Object = await this.productRepository.find();
            return ( products );
        }
        catch( err ){
            return ( "product service, getAll" + err );
        }
    }

    public getbyId = async ( id ) => {
        try {
            return ( await this.productRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "product service, getById" + err );
        }
    }

    public getbyIds = async ( ids ) => {
        try {
            return ( await this.productRepository.findByIds( ids ) );
        }
        catch( err ) {
            return ( "product service, getById" + err );
        }
    }

    public getByGender = async ( id ) => {
        try {
            let genderId = await this.genderRepository.findOne( id );
            let resultsByGender = await this.productRepository.query( `SELECT * FROM product WHERE gender_id=${ genderId.id }` );
            return resultsByGender.length > 0 ? resultsByGender : "Product with this id isn't exist";
        }
        catch( err ) {
            return ( "product service, getByGender" + err );
        }
    }

    public getByFilters = async ( filters ) => {
        try {

            // let isEmptyObject = async ( obj: Object ) => {
            //     for (var i in obj) {
            //       if (obj.hasOwnProperty(i)) {
            //         return true;
            //       }
            //     }

            //     return false;
            // }

            // if ( !Object.keys(filters) ) {
            //     return await this.productRepository.find();
            // }
            

            // if ( !isEmptyObject( filters ) ) {
            //     return await this.productRepository.find();
            // }

            let where = "";

            //brands, types etc...
            let keys = Object.keys(filters);

            if( keys.length === 0 ) {
                return await this.productRepository.query("SELECT * FROM product");
            }

            for (let i = 0;i < keys.length; i++){
                let property = keys[i]
  
                let value;

                //key properties like "puma", "nike" etc...
                value = filters[property];


                //checking if prop values have more than 1 element
                if ( value.length > 1 ) {
                    where +=`${ keys[i] } IN (${ value.map( item => {
                        return typeof item === "string" ? `'${ item }'` : item; //checking if property value is string
                    }) })`;

                    if( i !== keys.length - 1 ) {  //checking if property is last
                        where += " AND ";
                    }
                }
                else {
                    where += `${ keys[i] }=${ value.map( item => {
                        return typeof item === "string" ? `'${ item }'` : item; //checking if property value is string
                    }) }`

                    if ( i !== keys.length - 1 ) {  //checking if prop is last 
                        where += " AND ";      
                    }
                }
            }

            let query = `SELECT * FROM product WHERE ${ where }`
            let result = await this.productRepository.query( query );
            return result;
        }
        catch( err ){
            return ("product service getByFilters " + err);
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            if( !await this.productRepository.findOne( id ) ){
                return `Id ${ id } Not Found`;
            }
            let updatedProduct = await this.productRepository.update( id, body );
            return updatedProduct.affected ? "Updated successfully" : "Not updated, smth wrong";
        }
        catch ( err ) {
            return ( "product service, edit" + err );
        }
    }

    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.productRepository.delete( id );

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