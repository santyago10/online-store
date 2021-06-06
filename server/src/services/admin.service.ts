import { getRepository } from 'typeorm';
import Admin from "../models/admin.entity"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AdminService{
    
    private adminRepository;

    constructor(){
        this.adminRepository = getRepository( Admin );
    }


    public async registration ( body ){
        try{
            let hashPassword: string;
            let result = await this.adminRepository.find( { login: body.login } );
            if ( result[0] )
            return "Registrated";   
            else{                
                await ( bcrypt
                .genSalt( 12 )
                .then( salt => {
                console.log(`Salt: ${ salt }`);
            
                return bcrypt.hash( body.password, salt );
                })
                .then( async ( hash ) => {
                console.log(`Hash: ${ hash }`);
                hashPassword = hash;
                }))
                .catch( err => console.error( "Hashing error ", err.message ) );

                body.password = hashPassword;

                const newAdmin = this.adminRepository.create( body );
                await this.adminRepository.save( newAdmin );
                return( newAdmin );
            } 
        }
        catch( err ){
            console.log(err)
            return err;
        }
    }

    public async login( body ){
        let admin = await this.adminRepository.findOne( { login: body.login } );

        if( !admin ) 
        return false;

        let result = await bcrypt.compare( body.password, admin.password )
        if ( !result ) { return false; }
        let token = jwt.sign({ username: body.login }, 'secret');
        return token;
        
    }


    public async isAuthenticated( req ){
        if( req.isAuthenticated() )
        {
            return req.user ;
        }
        else
        {
            return false;
        }
    }

    public async logout( req ){
        req.logout();
        return 'Logged out';
    }
}
