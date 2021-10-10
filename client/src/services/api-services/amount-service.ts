import axios from 'axios';

export class AmountService {

    private path = "http://localhost:5000/amountByProduct";
    private oneSizePath = "http://localhost:5000/oneSizeAmount";
    private updatePath = "http://localhost:5000/amount";
    private incrementPath = "http://localhost:5000/incrementAmount";

    public getProductSizes = async ( id: number ) => {
        try {
            const results = await axios.get( `${ this.path }/${ id }` );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public getOneSizeAmount = async ( id: number, size: string ) => {
        try {
            const results = await axios.post( `${ this.oneSizePath }/${ id }`, {
                productSize: size,
            } );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public updateAmount = async ( id: number, size: string, amount: number ) => {

        try {
            const results = await axios.patch( `${ this.updatePath }/${ id }`, {
                product_size: size,
                newAmount: amount
            } );

            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public incrementAmount = async ( id: number, size: string, amount: number ) => {

        try {
            const results = await axios.patch( `${ this.incrementPath }/${ id }`, {
                product_size: size,
                newAmount: amount
            } );

            debugger
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }
}