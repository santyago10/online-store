import express from 'express';
import { getRepository } from 'typeorm';
import Gender from '../models/gender.entity';

export class GenderService {
    private genderRepository;
    
    constructor(){
        this.genderRepository = getRepository( Gender );
    }

    public create = async ( body: Object ) => {
        try{
            const newGender = await this.genderRepository.create( body );
            await this.genderRepository.save( newGender );
            return( newGender );
        }
        catch( err ){
            return ( "gender service, create" + err );
        }
    } 

    public getAll = async () => {
        try {
            const gender: Object = await this.genderRepository.find();
            return ( gender );
        }
        catch( err ){
            return ( "gender service, getAll" + err );
        }
    }

    public getbyId = async ( id ) => {
        try {
            return ( await this.genderRepository.findOne( id ) );
        }
        catch( err ) {
            return ( "gender service, getById" + err );
        }
    }

    public edit = async ( id, body: Object ) => {
        try{ 
            await this.genderRepository.update( id, body );
            const updatedGender = await this.genderRepository.findOne( id );
            if ( updatedGender ) {
                return updatedGender;
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "gender service, edit" + err );
        }
    }
    
    public delete = async ( id ) => {
        try {
            const deleteResponse = await this.genderRepository.delete( id );

            if ( deleteResponse.affected !== 0)  {
                return ( "Deleted successfully" );
            } 
            else {
                return("Not Found " + id);
            }
        }
        catch ( err ) {
            return ( "gender service, delete" + err );
        }
    }
}