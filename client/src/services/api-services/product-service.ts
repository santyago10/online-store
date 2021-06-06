import axios from 'axios';

export class ApiServices {

    private path = "http://localhost:5000/products";
    public productsByGenderPath = "http://localhost:5000/productByGender";
    private productsByFilters = "http://localhost:5000/byFilters";

    public getAllProducts = async () => {
        try {
            const results = await axios.get( `${ this.path }` );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public getProductsByGender = async ( genderId: number ) => {
        try {
            const results = await axios.get( `${ this.productsByGenderPath }/${ genderId }` );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public getProductsByFilter = async ( body: any ) => {
        try {
            const results = await axios.post( `${ this.productsByFilters }`, body );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public createProduct = async ( body: Object ) => {
        try { 
            const result = await axios.post( `${ this.path }`, body );
            return result.data;
        }
        catch( err ) {
            return err;
        }
    }

    public editProduct = async ( id: string, body: Object ) => {
        try {
            const result = await axios.patch( `${ this.path }/${ id }`, body );
            return result.data;
        }
        catch( err ) {
            return err;
        }
    }

    public deleteProduct = async ( id: string ) => {
        try { 
            const result = await axios.delete( `${ this.path }/${ id }` );
            return result.data; 
        }      
        catch ( err ) {
            return err;
        }
    }
}