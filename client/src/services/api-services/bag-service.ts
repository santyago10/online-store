import axios from 'axios';

export class BagService {

    private path = "http://localhost:5000/amountByProduct";

    public checkAmount = async ( id: number ) => {
        try {
            const results = await axios.get( `${ this.path }/${ id }` );
            debugger
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }
}