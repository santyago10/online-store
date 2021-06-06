import axios from 'axios';

export class BrandService {

    private path = "http://localhost:5000/brands";

    public getAllBrands = async () => {
        try {
            const results = await axios.get( `${ this.path }` );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }
}